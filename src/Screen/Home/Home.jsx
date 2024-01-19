import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth , db } from '../../config/firebase/config';
import { collection, query, addDoc ,getDocs} from "firebase/firestore"; 
import Navbar from '../../components/Navbar'
import Card from '../../components/Card';

const Home = () => {

    //CHECk USER
    let uid
    onAuthStateChanged(auth, (user) => {
        if (user) {
             uid = user.uid;
        } else {
            console.log('user is not login');
        }
    });



    //STATES
    const todo = useRef()
    const [Data , setData] = useState([])

    // ADD DATA FROM FIREBASE
    async function Addtodo(e) {
        e.preventDefault();
        const Todo = todo.current.value
        setData([...Data , Todo])

        try {
            const docRef = await addDoc(collection(db, "Todo"), {
                Items: Todo,
                UserId: uid
            });

        // todo.current.value = ''
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }


useEffect(()=>{
    async function Getdata(){

        const q = query(collection(db, "Todo"), );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());


        });


    }

Getdata()
})


  //DELETE TODO

  function deleteTodo(index){
    console.log("delete" , index);
    Data.splice(index ,1)
    setData([...Data])
  }


  function EditTodo(index , EditValue){
    console.log('Edit Todo');
    Data.splice(index , 1 , EditValue)
    setData([...Data])
  }




    return (
        <>
            <Navbar />
            <div>
                <form className='text-center' onSubmit={Addtodo}>
                    <input type="text" className='text-white bg-[#1d202c] px-3 mt-[80px]  w-[39%] rounded-2xl mr-2 h-10  ' ref={todo} placeholder='ENTER YOUR TODO' />
                    <button type='submit' className='px-6 pb-[6px] pt-[8px] bg-blue-400 rounded-full text-white font-poppins '>Add</button>
                </form>
            </div>

            {Data.map((item , index) => {
                return (
                    <Card key={index} title={item} deleteTodo={()=>{deleteTodo(index)}} EditTodo={EditTodo} index={index}/>

                )

            })}



        </>
    )
}

export default Home