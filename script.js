window.addEventListener('load',()=>{
    let btnArray = ['1','2','3','4','5','6','7','8','9','0','.','sin','cos','resin','+','-','*','/','(',')','='];
    const buttons = document.querySelector('#buttons')
    const screen = document.querySelector('#screen input')
    const arrow = document.querySelector('#arrow')
    btnArray.forEach(item=>{
        let btn = document.createElement('button')
        btn.appendChild(document.createTextNode(item));
        buttons.appendChild(btn);
    })

    buttons.addEventListener('click',(e)=>{
        let btnText = e.target.outerText
        if(btnText=='='){
            compute(screen.value)
        }else{
            if(btnArray.find(element => element==btnText)){
                screen.value+=btnText;
            }
        }
    })

    screen.addEventListener('keyup',(e)=>{
        if(e.key=="Enter"){
            compute(screen.value)
        }
    })

    arrow.addEventListener('click',()=>{
        let x = screen.value.slice(0,screen.value.length-1)
        screen.value=x;
    })

    function compute(exp){
        try{
            let x =math.evaluate(exp,{
                resin(x){
                    return 392.9*x;
                },
                sin(x){
                    if(isDegree()) return math.evaluate(`sin(${x}*(pi/180))`)
                    else return math.evaluate(`sin(${x})`)
                },
                cos(x){
                    if(isDegree()) return math.evaluate(`cos(${x}*(pi/180))`)
                    else return math.evaluate(`cos(${x})`)
                },
            })
            if(x<0) display(x.toFixed(5))
            else{
                let right =x.toString().split('.')[1]
                if(right) display(x.toFixed(5))
                else display(x)
            } 
        }catch(err){
            console.log(err)
            display("ERROR",err)
        }
        
    }

    function display(value,error){
        let answer =document.querySelector('#answer')
        if(error || value==undefined){
            if(!answer.classList.contains("red")){
                answer.classList.add('red')
            }
            answer.innerHTML=`Error: Invalid expression.`
        }else{
            if(answer.classList.contains("red")){
                answer.classList.remove('red')
            }
            answer.innerHTML=`${value}`
        }
    }

    function isDegree(){
        let unit =document.querySelector('input[name="angle-unit"]:checked').value
        if(unit=='deg') return true
        else return false;
    }
})

