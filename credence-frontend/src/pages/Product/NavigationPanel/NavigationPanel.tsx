import { Link } from 'react-router-dom';
import './NavigationPanel.css';
import { Button } from '@/components/ui/button';
import { authenticationService } from '@/services/api/Authentication';
import { useNavigate } from 'react-router-dom';
import { IconFactory } from '@/assets/Icons/IconsFactory';

import DashBoard from '@/assets/Icons/DashBoardIcon.svg';

function NavigationPanel() {

    const navigate = useNavigate();
    function handleLogout(){
        authenticationService.removeToken();
        navigate('/');
    }

  return (
    <nav className='w-[15%] p-5 h-full bg-primaryBlack flex flex-col rounded-tr-lg rounded-br-lg ' >
            <div className="title font-primary text-primaryWhite text-center text-2xl ">
                <h1 onClick={()=>{navigate('/')}} className='cursor-pointer mt-3 ' >Credence</h1>
            </div>
            <div className="navigation-panel-links flex justify-center flex-col flex-[0.95] ">
                <Link className='navigationpanel-link' to="/product/dashboard">
                   <img style={{
                    fill:'#FFFFFF',
                    stroke:'#FFFFFF'
                   }} className='text-primaryWhite h-6 w-6 mr-4 ' src={IconFactory.DashboardIcon} alt="" />
                    Dashboard
                </Link>
                <Link 
                    className='navigationpanel-link' 
                    to="/product/transactions"
                >
                    <img className='h-6 w-6 mr-4' src={IconFactory.WalletIcon}
                     alt="" />
                     Transactions
                </Link>
                <Link 
                    className='navigationpanel-link' 
                    to="/product/collaborationrooms" 
                >
                    <img className='h-6 w-6 mr-4' src={IconFactory.CollaborativeRoomsIcon}
                     alt="" />
                        collaborationrooms
                </Link>
                <Link 
                    className='navigationpanel-link' 
                    to="/product/splitbills" 
                >
                    <img className='h-6 w-6 mr-4' src={IconFactory.SplitBillIcon}
                     alt="" />
                        splitbills
                </Link>
                <Link 
                    className='navigationpanel-link' 
                    to="/product/billstopay" 
                >
                    <img className='h-6 w-6 mr-4' src={IconFactory.BillsIcon}
                     alt="" />
                        Reminders
                </Link>
            </div>
            <div className='w-full' >
                <Button variant='secondary' className='w-full' onClick={handleLogout} >Logout</Button>
            </div>
    </nav>
  )
}

export default NavigationPanel