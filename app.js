const header = document.querySelector('.table__header');

(async () => {
    const JSONdata = await(await fetch('data.json')).json();
    tableMaker(JSONdata);
})();

const sortName = document.querySelector('.table__header').firstElementChild
const sortPhone = document.querySelector('.table__header').firstElementChild.nextElementSibling
const sortAbout = document.querySelector('.table__header').firstElementChild.nextElementSibling.nextElementSibling
const sortEyeColor = document.querySelector('.table__header').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
const table = document.querySelector('#table')
const tbody = document.getElementById('table').getElementsByTagName("TBODY")[0]
const edit = document.createElement('div')

edit.classList.add('table__edit')
const nameEdit = document.createElement('input')
const phoneEdit = document.createElement('input')
const aboutEdit = document.createElement('input')
const eyeColorEdit = document.createElement('input')
const submitButton = document.createElement('button')


nameEdit.classList.add('form__edit')
phoneEdit.classList.add('form__edit')
aboutEdit.classList.add('form__edit')
eyeColorEdit.classList.add('form__edit')
submitButton.classList.add('form__submit')


submitButton.textContent = 'Submit changing'
submitButton.type = 'submit'


edit.appendChild(nameEdit)
edit.appendChild(phoneEdit)
edit.appendChild(aboutEdit)
edit.appendChild(eyeColorEdit)
edit.appendChild(submitButton)

function tableMaker(data) {

    for (let content of data){
        let name = document.createElement('td')
        let phone = document.createElement('td')
        let about = document.createElement('td')
        let eyeColor = document.createElement('td')

        name.textContent = `${content.name.firstName} ${content.name.lastName}`;
        phone.textContent = content.phone;
        about.textContent = content.about;
        eyeColor.textContent = content.eyeColor;
    
        let newRow = document.createElement('tr')
        newRow.classList.add('table__row')
        newRow.appendChild(name)
        newRow.appendChild(phone)
        newRow.appendChild(about)
        newRow.appendChild(eyeColor)
        
        newRow.addEventListener('click', function adder(event){
          if(event.target.parentNode.tagName === 'DIV') return // предотвращение входа в цикл, нужно, чтобы присваивать div в строку таблицы
          if (event.target.parentNode.lastElementChild.classList.value === 'table__edit') {
              newRow.removeChild(newRow.lastChild)
              
              return
            };
            
           
            let name = event.target.parentNode.firstElementChild.textContent
            let phone = event.target.parentNode.firstElementChild.nextElementSibling.textContent
            let about = event.target.parentNode.firstElementChild.nextElementSibling.nextElementSibling.textContent
            let eyeColor = event.target.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent


            edit.firstElementChild.value = name
            edit.firstElementChild.nextElementSibling.value = phone
            edit.firstElementChild.nextElementSibling.nextElementSibling.value = about
            edit.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value = eyeColor
            

            newRow.appendChild(edit)
            

            submitButton.addEventListener('click', (event)=>{
              let newName = event.target.parentNode.firstElementChild.value
              let newPhone = event.target.parentNode.firstElementChild.nextElementSibling.value
              let newAbout = event.target.parentNode.firstElementChild.nextElementSibling.nextElementSibling.value
              let newEyeColor = event.target.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value
              
              event.target.parentNode.parentNode.firstElementChild.innerHTML = newName
              event.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML = newPhone
              event.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = newAbout
              event.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = newEyeColor
              console.log(newName, newPhone, newAbout, newEyeColor)
            })
            /*innerHTML: ""    innerText: ""*/
        })

        tbody.appendChild(newRow)
   
    }
    
}
sortName.addEventListener('click', () =>{
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);
  table.tBodies[0].append(...sortedRows);
})
sortPhone.addEventListener('click', () =>{
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1);
  table.tBodies[0].append(...sortedRows);
})
sortAbout.addEventListener('click', () =>{
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1);
  table.tBodies[0].append(...sortedRows);
})
sortEyeColor.addEventListener('click', () =>{
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[3].innerHTML > rowB.cells[3].innerHTML ? 1 : -1);
  table.tBodies[0].append(...sortedRows);
})

