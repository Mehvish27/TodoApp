// react-query
// here e is event = event.target
import App from "../App";
import { useState } from "react";

function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div className="pb-2">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <input type="text" className="form-control form-control-sm" placeholder="Add new ..." onChange={function (e) {
                            const value = e.target.value;
                            setTitle(e.target.value);
                        }}></input>

                        <input type="text" className="form-control form-control-sm" placeholder="Description" onChange={function (e) {
                            const value = e.target.value;
                            setDescription(e.target.value);
                        }}></input>

                        <button className="btn-primary" onClick={() => {
                            fetch("http://localhost:3000/todo", {
                                method: "POST",
                                body: JSON.stringify({
                                    title: title,
                                    description: description
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                .then(async function (res) {
                                    if (!res.ok) {
                                        throw new Error(`API request failed with status ${res.status}`);
                                    }
                                    const json = await res.json();
                                    alert("Todo Created");

                                })
                                .catch((error) => {
                                    console.log("Error creating todo:", error);
                                })

                        }}> Add
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                                <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTodo