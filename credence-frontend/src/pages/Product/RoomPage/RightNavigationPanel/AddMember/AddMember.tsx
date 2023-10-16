import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData";
import { Badge } from "@/components/ui/badge";
import Form from "@/components/ui/form";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type InputProps = {
  roomId: string | undefined;
};

function AddMember({ roomId }: InputProps) {
  const [users, setUsers] = useState<RoomUsers[]>();

  const [addUserFormGenerator, setAddUserFormGenerator] = useState<
    FormGeneratorData[]
  >([
    {
      type: "text",
      name: "userId",
      placeholder: "Enter the User ID",
      elementProps: {
        required: true,
      },
    },
    {
      type: "submit",
      name: "addTransaction",
      value: "Add a Member",
    },
  ]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers(){
    backend.get(`/rooms/${roomId}`).then((data: AxiosResponse) => {
        setUsers(data.data);
        console.log("users updated",users);
      });
  }

  function addUserToUser(data: RoomUser) {
    data.roomId = roomId;
    console.log(data);
    backend.post("/rooms/addUser", data).then((response: AxiosResponse) => {
      console.log(response);
      loadUsers();
    });
  }

  return (
    <>
      <h1 className="font-primary font-bold flex justify-center mt-10">
        Room Members
      </h1>
      <div className="m-2">
        {users?.map((user) => {
          return <Badge className="mr-1 ml-1">{user.userName}</Badge>;
        })}
      </div>
      {/* <p className="text-xs">You can find the User ID in dashboard</p> */}
      <Form generatorData={addUserFormGenerator} onSubmit={addUserToUser} />
    </>
  );
}

export default AddMember;
