import { TUserDetails } from '@/TypeDefinitions/UserDetails';
import Player from "react-lottie-player";
import MaleAvatar from '@/assets/lottie_animations/MaleAvatar.json';
import FemaleAvatar from '@/assets/lottie_animations/FemaleAvatar.json';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services/api/CategoryService';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Form from '@/components/ui/form';
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import { logger } from '@/helpers/loggers/logger';
import CategoriesGroup from './CategoriesGroup/CategoriesGroup';

type UserDetailsProps = {
    userDetails:TUserDetails
}

function UserProfile({userDetails}:UserDetailsProps) {
    const {gender,userEmail,userId,userName} =  userDetails;
    const [categories,setCategories] = useState<string[]>([]);
    const [showAddCategoryInput,setShowAddCategoryInput] = useState(false);
    const [editable,setEditable] = useState(false);

    const addCategoryFormGeneratorData:FormGeneratorData[] = [{
        name:'newCategory',
        placeholder:'Press Enter to add',
        type:'text',
        elementProps:{
            required:true,
        }
    }]

    useEffect(()=>{
        categoryService.getCategories().then((response)=>{
            setCategories(response.data as string[]);
        }).catch((err)=>{
            toast({
                title:'unable to fetch the categories',
                variant:'destructive'
            })
        })
    },[]);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleAddCategory(formdata:any){
        let currentCategories = categories;
        const newCategory = formdata.newCategory;
        currentCategories = [...currentCategories,newCategory];
        categoryService.addCategory(currentCategories).then(()=>{
            setCategories(currentCategories);
        })
        .catch(()=>{
            toast({
                title:'Unable to add category',
                variant:'destructive'
            })
        })
    }

    function handleDeleteCategory(selectedCategory:string){
        const updatedCategories = categories.filter((category)=> category!=selectedCategory );
        logger.debug(updatedCategories);
        categoryService.deleteCategory(updatedCategories).then(()=>{
            setCategories(updatedCategories);
        }).catch((error)=>{
            logger.warn(error);
            toast({
                title:'Unable to delete Category',
                variant:'destructive'
            })
        })
    }

  return (
    <div className='w-full h-full rounded-2xl bg-secondaryWhite pt-10 pl-7 pr-7 ' >
        <div className="avatar_container h-[13rem] ">
            <Player style={{height:'100%'}} animationData={MaleAvatar} play loop={false} />
        </div>
        <div className="userInformation flex w-full justify-center items-center flex-col gap-3 mt-4">
            <h1 className='font-semibold text-[1.5rem] ' > Hi 👋🏻, <span className='font-bold text-[1.7rem]' >{userName}</span> </h1>
            <h1 className='text-gray-600' > {userEmail} </h1>
        </div>
        <div className="categories_container w-full mt-10">
            <div className="category_edit_buttons w-full flex justify-between">
                <Button className='w-[40%]' onClick={()=>{setShowAddCategoryInput((previousState)=>!previousState)}} >Add</Button>
                <Button className='w-[40%]' onClick={()=>{setEditable((previousState)=>!previousState) }} >Remove</Button>
            </div>
            {
                showAddCategoryInput? 
                <div className="addCategoryForm mt-5 ">
                    <Form onSubmit={handleAddCategory} generatorData={addCategoryFormGeneratorData} />
                </div>
                :
                null
            }
            <div className="categories_group mt-5">
                <CategoriesGroup deleteCategoryHandler={handleDeleteCategory} edit={editable} categories={categories} />
            </div>
        </div>
    </div>
  )
}

export default UserProfile;