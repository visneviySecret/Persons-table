(async () => {
    const JSONdata = await(await fetch('data.json')).json();
    tableMaker(JSONdata);
})();

const header = document.querySelector('.table__header');
const sortName = header.firstElementChild
const sortPhone = header.firstElementChild.nextElementSibling
const sortAbout = header.firstElementChild.nextElementSibling.nextElementSibling
const sortEyeColor = header.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
const table = document.querySelector('#table')
const tbody = document.getElementById('table').getElementsByTagName("TBODY")[0]
const edit = document.createElement('div')
const collection = []
const quantityOfSection = 10
const numberOfButton = 5
const pagDiv = document.createElement('tbody')
const pagContainer = document.querySelector('.container')


edit.classList.add('table__edit')
const nameEdit = document.createElement('input')
const phoneEdit = document.createElement('input')
const aboutEdit = document.createElement('input')
const eyeColorEdit = document.createElement('input')
const submitButton = document.createElement('button')

submitButton.classList.add('form__submit')
submitButton.textContent = 'Submit changing'
submitButton.type = 'submit'

for (let i of [nameEdit, phoneEdit, aboutEdit, eyeColorEdit]){
  i.classList.add('form__edit')
  edit.appendChild(i)
}
edit.appendChild(submitButton)

function paintPaginationButton(count)
     {
      for (i=1, r=""; i <= count; i++){
        r += `<button class="pb">${i}<button/>`
      }
      return r
    }
function paintResult (arr)
    {
      for (i = 0, r = []; i < arr.length; i++)
      {
        let newRow = arr[i]
        r.push(newRow)
      }
      return r
    }

function tableMaker(data) 
{
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

        for (let i of [name, phone, about, eyeColor]){
          newRow.appendChild(i)
        }
        collection.push(newRow)
        
    }
    table.firstElementChild.after(pagDiv)

    const block = document.createElement('div')
    block.classList.add('block')
    block.innerHTML = paintPaginationButton(numberOfButton)
    Array.from(block.childNodes).map((child, index) => { if (index % 2 !== 0 ) {block.removeChild(child)}}) //скрипт убирающий ошибку с возникновение дополнительных элементов <button> в пагинации
    block.firstElementChild.classList.add("active")

    let result = []
    result.push(paintResult(collection).slice(0, quantityOfSection))
    
    function addRow ([result])
    {
      
      for (let i of result){
        let newRow = i.cloneNode(true)
        newRow.addEventListener('click', function adder(event)
        {
          if(event.target.parentNode.tagName === 'DIV') return // предотвращение входа в цикл, нужно, чтобы присваивать div в строку таблицы
          if (event.target.parentNode.lastElementChild.classList.value === 'table__edit') // убирае эдит при повторном клике на него или на вызывающую его строку
          {
              newRow.removeChild(newRow.lastChild)
              return
            };
            let rowArray = Array.from(event.target.parentNode.childNodes)
            let rowEdit = edit.childNodes

            for (let i in rowArray){  //записываем значения строки в поле для редактирования
              rowEdit[i].value = rowArray[i].textContent
            }
            newRow.appendChild(edit)
            
            submitButton.addEventListener('click', (event)=> //перезапись полей в таблице
            { 
              let submitValues = Array.from(event.target.parentNode.childNodes)
              let newValues = Array.from(event.target.parentNode.parentNode.childNodes)

              for (let i = 0; i <= 3; i++)
              {
                newValues[i].innerHTML = submitValues[i].value
              }
            })
        })
        pagDiv.appendChild(newRow)
        
      }
    }
    addRow(result) //отрисовываем начальное состояние страницы

    pagContainer.appendChild(block) //добавляем блок с кнопками переключения страниц

    document.addEventListener('click', function(event)
    {
      if ([...event.target.classList].includes("pb"))
      { 
        if ([...event.target.classList].includes("active")) return //отмена перерисовки при повторном клике на выбранную страницу
         let y = event.target.textContent
         let start = quantityOfSection*(y-1)
         let end = quantityOfSection*y
         
         result = []
         result.push(paintResult(collection).slice(start, end))
         while (pagDiv.firstChild){
           pagDiv.removeChild(pagDiv.firstChild)
         }
         addRow(result)

         Array.from(block.childNodes).map(item =>
          {
            if([...item.classList].indexOf('active') === 1) item.classList.remove('active')

          })
        event.target.classList.add('active')
        }
   })
   
}

//сортировка столбцов, подходящая для структуры table
[sortName, sortPhone, sortAbout, sortEyeColor].map((item, index) => {
  item.addEventListener('click',()=>{
    let currentPage = document.querySelector('.block')
    currentPage = Array.from(currentPage.childNodes).filter(item => 
        [...item.classList].indexOf('active') === 1
    )
    currentPage = currentPage[0].innerHTML
    let y = currentPage
    let start = quantityOfSection*(y-1)
    let end = quantityOfSection*y
    let sortedRows = collection //получаем массив с данными для сортировки
    .slice(0)
    .sort((rowA, rowB) => rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1);
    let result = []
    result.push(paintResult(sortedRows).slice(start, end))
    while (pagDiv.firstChild){
      pagDiv.removeChild(pagDiv.firstChild)
    }
    result.map(item => table.tBodies[0].append(...item))
  })
})
