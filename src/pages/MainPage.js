import React from 'react'
import AddTask from "../forms/AddTask";
import Tasks from "../components/Tasks";

function MainPage() {
    return (
        <div>
           <AddTask/>
           <Tasks/> 
        </div>
    )
}

export default MainPage;
