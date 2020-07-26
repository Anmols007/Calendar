import React from 'react';
import './calendar.css'
import refresh from '../resources/refreshicon.png'

import repeat from '../resources/repeat.png'

import reschedule from '../resources/reschedule.png'

import cancel from '../resources/cancel.png'
import Modal from 'react-modal';
class Calendar extends React.Component{

constructor(props){
  super(props);
  this.state={currentData:{}};
this.data=[
  {time:"8AM" , arr:[{state:"Blocked"
  },{state:"Blocked"},{state:"Blocked"},{state:"Blocked"},{state:"Blocked"},{state:"Blocked"},{state:"Blocked"}] },
  
  {time:"9AM" , arr:[{state:"Blocked"
  },{state:"open",data:"open"},{state:"open",data:"open"},{state:"open",data:"open"},{state:"Booked",data:"Anmol Sharma"},{state:"open"},{state:"open"}] },
  
  
  {time:"10AM" , arr:[{state:"Blocked"
  },{state:"open",data:"open"},{state:"open",data:"open"},{state:"open",data:"open"},{state:"Booked",data:"Debbi D"},{state:"Booked",data:"Anmol Sharma"},{state:"Booked",data:"Sarah"}] },
  
  
  {time:"11AM" , arr:[{state:"Blocked"
  },{state:"open",data:"open"},{state:"open",data:"open"},{state:"open",data:"open"},{state:"Booked",data:"Timberlake"},{state:"Booked",data:"Timberlake"},{state:"Booked",data:"William"}] },
  
  
  {time:"12AM" , arr:[{state:"Blocked"
  },{state:"open",data:"open"},{state:"open",data:"open"},{state:"open",data:"open"},{state:"Booked",data:"John M"},{state:"Booked",data:"Shawn "},{state:"Booked",data:"Missy Taylor"}] },
  
  {time:"1AM" , arr:[{state:"Blocked"
  },{state:"open",data:"open"},{state:"open",data:"open"},{state:"open",data:"open"},{state:"Booked",data:"Steve Smith"},{state:"Booked",data:"Steve Smith"},{state:"Booked",data:"Justin Canetti"}] }
  ]  
}

componentDidMount(){
  this.setState({data:this.data});
}

dragS=(ev,index,innerindex)=>{
  
  ev.dataTransfer.setData("index", index);
  
  ev.dataTransfer.setData("innerindex", innerindex);
}


drop=(ev,index,innerindex)=>{
console.log("drop param",index,innerindex);
var dragin = ev.dataTransfer.getData("index");  
var draginner=ev.dataTransfer.getData("innerindex");
console.log("drag param",dragin,draginner);
this.rearrangement(index,innerindex,dragin,draginner);

}

rearrangement=(dropin,dropinner,dragin,draginner)=>{
let slotState=JSON.parse(JSON.stringify(this.state.data));
let temp=JSON.parse(JSON.stringify(slotState[dragin].arr[draginner]));
slotState[dragin].arr[draginner]=JSON.parse(JSON.stringify(slotState[dropin].arr[dropinner]))
slotState[dropin].arr[dropinner]=temp;
this.setState({data:slotState});
}


render(){
console.log(this.state,"state render")

return (
<>
<div className="background">
<div className="content pt-8">
<div className="flex mb-4">
<p class="font-bold w-16 mt-4"></p>
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Sunday
      <p className="text-3xl ">  29</p>
    </div>
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Monday
      <p className="text-3xl "> 30</p>
    </div>
   
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Tuesday
      <p className="text-3xl "> 31</p>
    </div>
  
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Wednesday
      <p className="text-3xl "> 1</p>
    </div>
    
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Thursday
      <p className="text-3xl "> 2</p>
    </div>
   
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Friday
      <p className="text-3xl "> 3</p>
    </div>
 
    <div className="flex-1  mr-2   font-bold  text-center  mb-1 rounded-lg h-16">
        Saturday
      <p className="text-3xl "> 4</p>
    </div>
  </div>
  {this.state && this.state.data && this.state.data.map((el,index)=>{
return (
<div className="flex ">
<p class="font-bold w-16 mt-4">{el.time}</p>
{el.arr.map((innerel,innerindex)=>{
  return <div className="flex-1 h-18" draggable="true" 
  onDragOver={(e)=>{e.preventDefault()}}
  onDrop={(ev)=>{this.drop(ev,index,innerindex)}}
  onDragStart={(e)=>{this.dragS(e,index,innerindex)}}> 
 {innerel.state=="Blocked" && <div 
 onClick={()=>{this.setState({open:true,currentData:innerel})}} 
 
className=" border-solid border-2 mr-2 showslot text-gray-400   mb-1 rounded-lg ">
  <p className="ml-2">{el.time}</p>
  <p className="ml-2 mb-4">Blocked</p>

  </div> }
  
 {innerel.state=="open" && 
    <div 

    onClick={()=>{this.setState({open:true,currentData:innerel})}}
    className=" border-solid  showslot open border-2 mr-2  font-normal   mb-1 rounded-lg ">
          <p className="ml-4 text-sm mt-2  text-blue-600">{el.time}</p>
    <p className="ml-4 mb-4 text-base  text-indigo-400">Open</p>

    </div>}
    
 {innerel.state=="Booked" && 
    
    <div 
    onClick={()=>{this.setState({open:true,currentData:innerel})}} 
    className=" border-solid border-2 mr-2  booked showslot   mb-1 rounded-lg ">
        <p className="ml-4 text-xs mt-2 pb-5    font-xs text-white h-4">{el.time} <img className="ml-4 refresh" src={refresh}/></p>
<p className="ml-4 mb-6 text-xs  text-white font-xs">{innerel.data}</p>
    </div>
    }
  </div>
})}
</div>
)


})}

</div>
<Modal isOpen={this.state.open} 
style={
  {
    overlay: {
      position: 'fixed',
      top: "100px",
      left: "25%",
      right: "40%",
      bottom: "150px",
      backgroundColor:"rgba()",
      borderRadius:"50px !important"
    }
  }
}>
  <p onClick={()=>{this.setState({open:false})}}  className="ml-2 text-gray-400">x</p>
  <div className="pl-8">
  {  this.state.currentData.state=="Booked" &&
  <>
  <h2 className="font-bold text-2xl">Debbi D</h2>
  <h6 className="font-bold mt-2 text-xs">Tuesday,March 31 at 10:00am </h6>
  <p><img className="mt-4" src={repeat}/></p>
<br/>
<span><img className="confirm" src={reschedule}/>
  <img className="confirm" src={cancel}/></span>
  
</>
 }
{this.state.currentData.state!="Booked" &&
  <h2 className="font-bold mt-12 text-2xl">Slot Is {this.state.currentData.state}!!!</h2>

}
  </div>
  </Modal>
</div>
</>
)
}


}

export default Calendar;