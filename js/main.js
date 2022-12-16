window.addEventListener("load",()=>{


    var accounts;
    

  
    async function connect(){
      if(typeof window.ethereum !== 'undefined') {
             
              accounts =  await window.ethereum.request({ method: 'eth_accounts' });
            // Or connect to a node
            console.log(accounts);
          return accounts;
        } 

    }
    
    
           
   
  

    

    var contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"string","name":"newValue","type":"string"}],"name":"editTodo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTodos","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newValue","type":"string"}],"name":"pushToTodos","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"remfromTodos","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"todos","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

      // Set Contract Address
      var contractAddress = '0xd42d39836365b033b84f8d1314801cbceebaac67'; // Add Your Contract address here!!!
    
    var contract;
      // Set the Contract
      

    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");


    function createTasks(tsk){
      const task_el = document.createElement("div");
       task_el.classList.add("task");

       const task_content_el = document.createElement("div");
       task_content_el.classList.add("content");

       task_el.appendChild(task_content_el);

       const task_input_el = document.createElement("input");
       task_input_el.classList.add("text");
       task_input_el.type = "text";
       task_input_el.value = tsk;
       task_input_el.setAttribute("readonly","readonly");
       task_content_el.appendChild(task_input_el);

       const task_action_el = document.createElement("div");
       task_action_el.classList.add("action");
       

       const task_edit_el = document.createElement("button");
       task_edit_el.classList.add("edit");
       task_edit_el.innerHTML = "Edit";
       task_action_el.appendChild(task_edit_el);

       const task_del_el = document.createElement("button");
       task_del_el.classList.add("delete");
       task_del_el.innerHTML = "Delete";
       task_action_el.appendChild(task_del_el);


       task_el.appendChild(task_action_el);
       list_el.appendChild(task_el);
       input.value = "";


       task_edit_el.addEventListener("click",()=>{
        
        const index = Array.from(
          list_el.children
          ).indexOf(task_el);
            if(task_edit_el.innerText.toLowerCase()=="edit"){
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";

            }
            else{
                task_input_el.setAttribute("readonly","readonly");
                contract.editTodo(index,task_input_el.value);
                task_edit_el.innerText = "Edit";
            }
       });


       task_del_el.addEventListener("click",()=>{
        
        if(task_edit_el.innerText.toLowerCase()=="edit"){
          const index = Array.from(
              list_el.children
              ).indexOf(task_el);
              contract.remfromTodos(index);
            list_el.removeChild(task_el);
            
            
            
        }
        
   });
    }

    form.addEventListener("submit",async (e)=>{
       e.preventDefault();
       if(!accounts){
           accounts = await connect();
           const provider = new ethers.providers.Web3Provider(window.ethereum);
            const walletAddress = accounts[0];
             const signer = provider.getSigner(walletAddress);

            contract = new ethers.Contract(contractAddress, contractAbi, signer);

      
      contract.getTodos().then((res) =>{
        for(var i = 0 ; i < res.length;i++){
          createTasks(res[i]);
        }
      });

       }
        else{
            const task = input.value;
       if(!task){
            return;
       }
       contract.pushToTodos(task);

       input.value = "";
        }
      });
        
});
