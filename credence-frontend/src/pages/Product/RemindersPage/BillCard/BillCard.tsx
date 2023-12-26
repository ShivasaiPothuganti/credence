import { TBill } from "@/TypeDefinitions/Bill";
import "./BillCard.css";
import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";
import { IconFactory } from "@/assets/Icons/IconsFactory";
// import {cx} from '';

type BillCardProps = {
  bill: TBill;
  toggleBillStatusHandler: Function;
  deleteBillHandler: Function;
};

function BillCard({
  bill,
  toggleBillStatusHandler,
  deleteBillHandler,
}: BillCardProps) {
  const { id, title, price, description, expiryDate, status } = bill;

  return (
    <div className="p-5 h-52 w-[22rem] flex shadow-xl group border border-solid-[#efefef] relative">
      <div className="bills_details flex w-full ">
        <div className="billcard_left flex-[0.8] ">
          <h1 className="text-[2rem] font-semibold "> {title} </h1>
          {description ? <p className="mt-2" > {description} </p> : null}
          <p className="absolute bottom-3">
				Expires On: <span className="ml-2 italic text-gray-500" > {expiryDate} </span>
			</p>
        </div>
        <div className="billcard_right flex-[0.2]  ">
          <p className="p-[1rem] rounded-full text-lg bg-primaryBlack text-primaryWhite flex justify-center items-center">
			
            {price}
          </p>
        </div>
        <span
          style={{
            backgroundColor: status === true ? "red" : "lightgreen",
            boxShadow:
              status === true
                ? "0px 0px 5px 3px red"
                : "0px 0px 5px 3px lightgreen",
          }}
          className="block absolute bottom-5 right-5 w-1 h-1 shadow-2xl rounded-lg "
        ></span>
      </div>
      <div className="bills_button_container z-1 hidden absolute w-[90%] p-1 bottom-0 group-hover:block ">
        <div className="justify-between flex w-full bottom-0 ">
          <Button
		  	style={{
				backgroundColor:"lightgreen",
				width:'70%',
				color:'black'
			}}
            onClick={() => {
              toggleBillStatusHandler(id);
            }}
          >
            {" "}
            {status === true ? "Paid" : "revoke"}{" "}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteBillHandler(id);
            }}
          >
            <img className="h-full" src={IconFactory.DeleteIcon} alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BillCard;
