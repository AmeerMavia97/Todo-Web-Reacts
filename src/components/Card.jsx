import React, { useRef, useState } from 'react'

const Card = ({ title, deleteTodo, EditTodo, index }) => {

    const [showTodo , setshowTodo] = useState(true)
    const editedValue = useRef()


    function saveEditvalue(){
        const EditValue = editedValue.current.value

        EditTodo(index , EditValue)
        setshowTodo(true)

    }



    return (
        <>
        {showTodo ? <div className='mt-4'>
            <div className='ml-[30%] p-1 mr-[30%] rounded mt-9 flex justify-between'>
                <p className='text-xl font-bold' >{title}</p>
                <div className=''>
                    <button onClick={deleteTodo} className='text-white  mr-6'><i class=" text-blue-400 fa-solid fa-trash"></i></button>
                    <button onClick={()=>{setshowTodo(false)}} className='text-white mr-3'><i class="text-blue-400 mr-3 fa-solid fa-pen-to-square"></i></button>
                </div>
            </div>
            <span><hr className=' ml-[28%] w-[45%]' /></span>
        </div>: <div>
        <div className='ml-[30%] p-1 mr-[30%] rounded mt-9 flex justify-between'>
            <input type="text" className='w-[350px] hover:border-blue-400 hover:border-solid hover:border-[1px]' placeholder='ENTER EDIT VALUE' ref={editedValue} />
            <button onClick={saveEditvalue} className='mr-12  text-2xl' type='submit' ><i class="text-blue-400 fa-solid fa-check"></i></button>
            </div>
            <span><hr className=' ml-[28%] w-[45%]' /></span>            
                
            </div>}
        </>

        
    )
}

export default Card