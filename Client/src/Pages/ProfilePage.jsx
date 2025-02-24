import React, { useState } from "react";
import { Tags } from "../dashboardComponent/index.js";
import { Tasks } from "./TaskPage";
import { useTodo } from "../context/TodoContext.js";

function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [iconClick, setIconClick] = useState(null);
    const [link, setLink] = useState(null);
    const [todos , setTodos] = useState([])
    const {getTodoById} = useTodo()

    const socialLinks = [
        { name: "facebook", img: "/Images/Icons/facebook.png" },
        { name: "github", img: "/Images/Icons/github.png" },
        { name: "pinterest", img: "/Images/Icons/pinterest.png" },
        { name: "linkedin", img: "/Images/Icons/linkedin.png" },
        { name: "instagram", img: "/Images/Icons/instagram.png" },
    ];
    const tags = [
                    { name: "Work", color: "#6b7280" },        // Gray
                    { name: "Personal", color: "#2563eb" },    // Blue
                    { name: "Fitness", color: "#10b981" },     // Green
                    { name: "Study", color: "#8b5cf6" },       // Purple
                    { name: "Travel", color: "#fb923c" },      // Orange
        ]

    const handleTagClick = async (tagname) =>{
        const todo = await getTodoById(tagname[0])
        setTodos(todo)
    }

    const handleSubmitLink = (e) => {
        console.log(link);
    };

  return (
    <div className="w-full h-full flex justify-center relative">
      {/*Profile Info*/}
      <div className="profile-container mt-12">
        {/*Profile Icons and names*/}
        <div className="relative flex gap-3">
          <div className="relative">
            <div className="profile-picture"></div>
            <div className="profile-status"></div>
          </div>

          <div>
            <div className="profile-name">Name</div>
            <div className="profile-email">arin@gmail.com</div>
          </div>
        </div>

        {/*Add Link*/}
        <div className="flex justify-between items-center mt-1">
          <div>
            <div onClick={() => setIsOpen(true)} className="profile-link-add">
              Add Link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15px"
                viewBox="0 -960 960 960"
                width="15px"
                fill="#353531"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>

            {isOpen && (
              <div onClick={() => setIsOpen(false)} className="modal-overlap">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="profile-input-link"
                >
                  <div
                    onClick={() => setIsOpen(false)}
                    className="profile-input-close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="lightgray"
                    >
                      <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
                    </svg>
                  </div>
                  <div className="link-container">
                    <div className="flex gap-3 justify-center">
                      {socialLinks.map((item, index) => (
                        <div
                          key={index}
                          className={`link-style ${
                            iconClick === index ? "iconClick" : ""
                          }`}
                          style={{
                            backgroundImage: item.img
                              ? `url(${item.img})`
                              : "none",
                          }}
                          onClick={() => setIconClick(index)}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="text"
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter the link"
                        className="link-input-box"
                      />
                    </div>
                    <div className="flex justify-end pr-10">
                      <button
                        onClick={handleSubmitLink}
                        className="link-button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <button className="profile-edit-button">Edit</button>
          </div>
        </div>

        {/*Date*/}
        <div className="text-xs pl-1 t3">12/12/2012</div>

        <hr className="m-0"/>

        {/*Profile Info*/}
        <div className="profile-info-container relative">
          <div className="w-1/2 relative">
            <div className="profile-general h1 mt-1 mb-1">General</div>
            <div className="flex gap-3">
              <div className="profile-general-info t3">
                <div className="flex gap-1 t3">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#888888"><path d="M168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm312-240L168-611v347h624v-347L480-432Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z"/></svg>
                  Email
                </div>
                <div className="flex gap-1 t3">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#888888"><path d="M763-145q-121-9-229.5-59.5T339-341q-86-86-135.5-194T144-764q-2-21 12.29-36.5Q170.57-816 192-816h136q17 0 29.5 10.5T374-779l24 106q2 13-1.5 25T385-628l-97 98q20 38 46 73t57.97 65.98Q422-361 456-335.5q34 25.5 72 45.5l99-96q8-8 20-11.5t25-1.5l107 23q17 5 27 17.5t10 29.5v136q0 21.43-16 35.71Q784-143 763-145ZM255-600l70-70-17.16-74H218q5 38 14 73.5t23 70.5Zm344 344q35.1 14.24 71.55 22.62Q707-225 744-220v-90l-75-16-70 70ZM255-600Zm344 344Z"/></svg>
                  Contact
                </div>
                <div className="flex gap-1 t3">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#888888"><path d="M264-216h96v-240h240v240h96v-348L480-726 264-564v348Zm-72 72v-456l288-216 288 216v456H528v-240h-96v240H192Zm288-327Z"/></svg>
                  Address
                </div>
              </div>
              <div className="profile-general-info t2">
                <div>arin@gmail.com</div>
                <div>88888888888</div>
                <div>Makikdggd</div>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <div className="flex gap-1 t2">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#888888"><path d="M336-240h288v-72H336v72Zm0-144h288v-72H336v72ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z"/></svg>
                About
                </div>
              <button className="about-add-button">
                <div>Add</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="10px"
                  viewBox="0 -960 960 960"
                  width="10px"
                  fill="#016fb9"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </button>
            </div>
          </div>

          {/**Achievements Info*/}
          <div className="w-1/2 flex-col justify-items-center mt-1">
            <div className="profile-achievement-text h1">Achievements</div>

            <div className="profile-achievement-container mt-1"></div>
          </div>
        </div>

        {/*Notes*/}
        <div className="notes-container h1 mt-1">
          <div className="profile-general h1 mt-1 mb-1">Notes</div>
          <div className="profile-note">
            <svg className="profile-note-add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555555"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          </div>
        </div>

        {/*Todos*/}
        <div className="profile-todo-container">
            <div className="profile-todo-text h1 mb-1">
                Todos
            </div>
            <div className="flex gap-1">
                {tags.map(({name , color})=>
                    <Tags name={name} color={color} onTagClick={handleTagClick}/>
                )
                }
            </div>
            { todos.length === 0 ?
              (<div className="mt-3 text-xs t3">
                No Todos added yet
              </div>
              ) 
              :
              (
              todos.map((todo , key) => (
              <div key={key} className="mt-3">
                  <Tasks id={todo.id} todo={todo.todo} color={todo.todocolor} type={todo.todotype} tododesc={todo.tododesc} tododate={todo.tododate}/>
              </div>
              )))}
        </div>
      </div>
    </div>
  );
}

function Notes({}){
  return(
    <div>
        
    </div>
  )
}

export default ProfilePage;
