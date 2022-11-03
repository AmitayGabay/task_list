const input = document.querySelector(".input");
const add = document.createElement("button");
add.className = "add_btn";
add.innerText = "ADD";
input.parentElement.append(add);
const todo = document.querySelector(".todo");
const done = document.querySelector(".done");
const page_list = document.querySelector(".page_list");
const remove_all = document.querySelector(".remove_all");
const spanRemove_all = document.querySelector("#id_span");
spanRemove_all.innerText = "TODO";
const switch_btn = document.querySelector(".switch_btn");
const spanSwitch_btn = document.querySelector("#id_second_span");
spanSwitch_btn.innerText = "DARK";
let defaultModeIsDark = false;
let itemsArr = [];

input.addEventListener("keyup", () => {
    if (input.value == "") {
        add.style.display = "none";
    }
    else {
        add.style.display = "block";
    }
})

input.addEventListener("keypress", (e) => {
    if (e.key == "Enter" && input.value != "") {
        const taskObg = { content: input.value, isDone: false, id: Date.now() };
        itemsArr.unshift(taskObg);
        add.style.display = "none";
        input.value = "";
        renderTodo();
    }
})

add.addEventListener("click", () => {
    const taskObg = { content: input.value, isDone: false, id: Date.now() };
    itemsArr.unshift(taskObg);
    add.style.display = "none";
    input.value = "";
    renderTodo();
})

const renderTodo = () => {
    page_list.innerHTML = "";
    itemsArr.forEach(item => {
        if (item.isDone === false) {
            const idOfItem = item.id;
            const removeId = idOfItem;
            const doneId = idOfItem + 1;

            const div_wrapper = document.createElement("div");
            div_wrapper.className = "div_wrapper";

            const div_text = document.createElement("div");
            div_text.className = "div_text";
            div_text.innerText = item.content;

            const div_btns = document.createElement("div");
            div_btns.className = "div_btns";

            const remove_btn = document.createElement("button");
            remove_btn.className = "remove_btn";
            remove_btn.id = removeId;
            remove_btn.innerText = "REMOVE";

            const done_btn = document.createElement("button");
            done_btn.className = "done_btn";
            done_btn.id = doneId;
            done_btn.innerText = "DONE";

            page_list.append(div_wrapper);
            div_wrapper.append(div_text);
            div_wrapper.append(div_btns);
            div_btns.append(remove_btn);
            div_btns.append(done_btn);

            removeItem(remove_btn);
            doneItem(done_btn);
        }
    })
    spanRemove_all.innerText = "TODO";
}

const removeItem = (_remove_btn) => {
    _remove_btn.addEventListener("click", () => {
        const indexOfItemDeleted = itemsArr.findIndex((item) => {
            return item.id == _remove_btn.id;
        })
        let toggle = itemsArr[indexOfItemDeleted].isDone;
        itemsArr.splice(indexOfItemDeleted, 1);

        if (toggle === false) {
            renderTodo();
        }
        else {
            renderDone();
        }
    })
}

const doneItem = (_done_btn) => {
    _done_btn.addEventListener("click", () => {
        const indexOfItemDone = itemsArr.findIndex((item) => {
            return item.id == _done_btn.id - 1;
        })
        let toggle = itemsArr[indexOfItemDone].isDone;
        if (toggle === false) {
            itemsArr[indexOfItemDone].isDone = true;
            renderTodo();
        }
        else {
            itemsArr[indexOfItemDone].isDone = false;
            renderDone();
        }
    })
}

done.addEventListener("click", () => {
    renderDone();
})

const renderDone = () => {
    page_list.innerHTML = "";
    itemsArr.forEach(item => {
        if (item.isDone === true) {
            const idOfItem = item.id;
            const removeId = idOfItem;
            const unDoneId = idOfItem + 1;

            const div_wrapper = document.createElement("div");
            div_wrapper.className = "div_wrapper";

            const div_text = document.createElement("div");
            div_text.className = "div_text";
            div_text.innerText = item.content;

            const div_btns = document.createElement("div");
            div_btns.className = "div_btns";

            const remove_btn = document.createElement("button");
            remove_btn.className = "remove_btn";
            remove_btn.id = removeId;
            remove_btn.innerText = "REMOVE";

            const unDone_btn = document.createElement("button");
            unDone_btn.className = "unDone_btn";
            unDone_btn.id = unDoneId;
            unDone_btn.innerText = "UNDONE";

            page_list.append(div_wrapper);
            div_wrapper.append(div_text);
            div_wrapper.append(div_btns);
            div_btns.append(remove_btn);
            div_btns.append(unDone_btn);

            removeItem(remove_btn);
            doneItem(unDone_btn);
        }
    })
    spanRemove_all.innerText = "DONE";
}

todo.addEventListener("click", () => {
    renderTodo();
})

remove_all.addEventListener("click", () => {
    if (spanRemove_all.innerText === "TODO") {
       itemsArr = itemsArr.filter(item => item.isDone !== false);
        renderTodo();
    }
    if (spanRemove_all.innerText === "DONE") {
        itemsArr = itemsArr.filter(item => item.isDone !== true);
        renderDone();
    }
})

switch_btn.addEventListener("click", () => {
    if (defaultModeIsDark === false) {
        document.body.style.background = "rgba(24, 23, 23, 0.916)";
        input.parentElement.style.border = "solid white 4px";
        input.parentElement.style.background = "rgba(24, 23, 23, 0.916)";
        input.style.background = "rgba(24, 23, 23, 0.916)";
        input.style.color = "white";
        todo.style.color = "rgba(24, 23, 23, 0.916)";
        todo.style.background = "rgb(160, 219, 97)";
        todo.style.border = "solid white 2px";
        done.style.color = "rgba(24, 23, 23, 0.916)";
        done.style.background = "rgb(219, 151, 219)";
        done.style.border = "solid white 2px";
        remove_all.style.color = "rgba(24, 23, 23, 0.916)";
        remove_all.style.background = "rgb(194, 48, 48)";
        switch_btn.style.color = "rgba(24, 23, 23, 0.916)";
        switch_btn.style.background = "white";
        page_list.style.color = "white";
        spanSwitch_btn.innerText = "LIGHT";

        defaultModeIsDark = true;
    }
    else{
        document.body.style.background = "white";
        input.parentElement.style.border = "solid black 4px";
        input.parentElement.style.background = "white";
        input.style.background = "white";
        input.style.color = "black";
        todo.style.color = "white";
        todo.style.background = "rgb(69, 168, 69)";
        todo.style.border = "solid black 2px";
        done.style.color = "white";
        done.style.background = "rgb(32, 93, 235)";
        done.style.border = "solid black 2px";
        remove_all.style.color = "white";
        remove_all.style.background = " rgb(251, 43, 28)";
        switch_btn.style.color = "white";
        switch_btn.style.background = "gray";
        page_list.style.color = "black";
        spanSwitch_btn.innerText = "DARK";

        defaultModeIsDark = false;
    }

})


