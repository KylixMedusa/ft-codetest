import React, { useEffect, useState } from 'react';

type Props = {
  type:string;
  correctAns:string;
  incorrectAns:string[];
  submit:(arg:boolean)=>void;
  random:number;
}

const Options:React.FC<Props> = (props) => {

  const [revealed,setRevealed] = useState(false); //This is used to check whether the answer is revealed or not

  //This function is used to reveal answers and also submit to display judgement
  function reveal(val:boolean, event:any){
    if(!revealed){
      setRevealed(true);
      let nodes:HTMLCollectionOf<Element> = document.getElementsByClassName("option");
      event.target.classList.add("selected");
      for(let node of nodes){
        node.classList.add("revealed");
      }
      if(!val){
        if(props.type === "boolean"){
          if(props.correctAns === "true"){
            nodes[0].classList.add("correct");
          }
          else{
            nodes[1].classList.add("correct");
          }
        }
        else{
          nodes[props.random-1].classList.add("correct");
        }
      }
      props.submit(val);
    }
  }

  //This useEffect hook handles reset of reveal state when question is updated
  useEffect(()=>{
    setRevealed(false);
  },[props.correctAns]);

  //This function is used to generate options depending on type of the question
  function generateOptions(){
    let buttons = [];
    if(props.type === "boolean"){
      if(props.correctAns === "true"){
        buttons.push(
          <button className="button-primary option" onClick={(e)=>reveal(true,e)} key={1}>True</button>
        );
        buttons.push(
          <button className="button-primary option" onClick={(e)=>reveal(false,e)} key={2}>False</button>
        );
      }
      else{
        buttons.push(
          <button className="button-primary option" onClick={(e)=>reveal(false,e)} key={1}>True</button>
        );
        buttons.push(
          <button className="button-primary option" onClick={(e)=>reveal(true,e)} key={2}>False</button>
        );
      }
    }
    else{
      let c = 0;
      for(var i=1; i<=4;i++){
        if(i===props.random){
          buttons.push(
            <button className="button-primary option" onClick={(e)=>reveal(true,e)} key={props.correctAns}>{props.correctAns}</button>
          );
          continue;
        }
        else{
          buttons.push(
            <button className="button-primary option" onClick={(e)=>reveal(false,e)} key={props.incorrectAns[c]}>{decodeURIComponent(props.incorrectAns[c])}</button>
          );
          c++;
        }
      }
    }
    return buttons;
  }

  return (
   <div className="options">
     {generateOptions()}
   </div>
  );
}

export default Options;