import React, { useState } from "react";
import { Tags } from "../dashboardComponent/index.js";
import { Tasks } from "./TaskPage";
import { useTodo } from "../context/TodoContext.js";

function ProfilePage({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [iconClick, setIconClick] = useState(null);
    const [link, setLink] = useState(null);
    const [todos , setTodos] = useState([{}])
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
      <div className="profile-container">
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
        <div className="flex justify-between items-center mt-3">
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
        <div className="text-xs pl-1">12/12/2012</div>

        <hr />

        {/*Profile Info*/}
        <div className="profile-info-container relative">
          {/*General Info*/}
          <div className="w-1/2 relative">
            <div className="profile-general h1 mt-3 mb-3">General</div>
            <div className="flex gap-3">
              <div className="profile-general-info t3">
                <div>Email</div>
                <div>Contact</div>
                <div>Address</div>
              </div>
              <div className="profile-general-info t2">
                <div>arin@gmail.com</div>
                <div>88888888888</div>
                <div>Makikdggd</div>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <div className="t2">About</div>
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
            <div className="flex justify-between text-xs mt-3 relative">
              <div className="t2 flex relative">
                <div className="relative">Motivation</div>
                <div className="motivation-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 -960 960 960"
                    width="12px"
                    fill="gray"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                  <div className="motivation-info-tip">
                    This is a sample tool Tip
                  </div>
                </div>
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
          <div className="w-1/2 flex-col justify-items-center mt-3">
            <div className="profile-achievement-text h1">Achievements</div>

            <div className="profile-achievement-container mt-3"></div>
          </div>
        </div>

        {/*Notes*/}
        <div className="notes-container h1 mt-3">
          <div>Notes</div>
          <div className="text-xs">Need to add</div>
        </div>

        {/*Todos*/}
        <div className="profile-todo-container">
            <div className="profile-todo-text h1 mb-3">
                Todos
            </div>
            <div className="flex gap-1">
                {tags.map(({name , color})=>
                    <Tags name={name} color={color} onTagClick={handleTagClick}/>
                )
                }
            </div>
            { todos.length === 0 ?
              (<div>
                Empty 
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

export default ProfilePage;
