/*  
 rendering all the Todos as an array of objects
 todos = [
    {
        title: "go to gym",
        description: "go to gym at 8 AM",
    },
    {
        title: "go to study",
        description: "at 10 AM",  
    }
 ]
*/
function Todos({ todos }) {

    return (
        <div>
            {todos.map(function (todo) {
                return (
                    <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                        <ul class="list-group list-group-horizontal rounded-0 bg-transparent"></ul>
                        <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">{todo.title}</li>
                        <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">{todo.description}</li>
                        <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                            <input class="form-check-input me-0" type="checkbox" checked={todo.completed == true} onClick={() => {
                                fetch("http://localhost:3000/completed", {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        id: todo._id
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
                                        alert("Todo Completed");
                                    }).
                                    catch((error) => {
                                        console.log("Error updating todo:", error);
                                    })
                            }}></input>

                        </li>
                    </div>
                )
            })}
        </div>
    )
}

export default Todos