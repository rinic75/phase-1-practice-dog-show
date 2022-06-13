document.addEventListener('DOMContentLoaded', () => {
  fetchAllDog().then(dogs=> dogs.forEach(dog => renderDog(dog)))
})

function fetchAllDog() {
  return fetch("http://localhost:3000/dogs")
  .then(res => res.json())
}

function fetchSingleDog(id) {
  return fetch(`http://localhost:3000/dogs/${id}`)
    .then(res => res.json())
}

function patchDog(id, dog) {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  }).then(res => res.json())
    //.then(data => console.log(`patched data : ${data.name}`))
}

function renderDog(dog) {
  const tbody = document.querySelector('#table-body')
  const table = document.createElement('tr')
  const dogName = document.createElement('td')
  const dogBreed = document.createElement('td')
  const dogSex = document.createElement('td')
  const editbttn = document.createElement('button')

  dogName.textContent = dog.name
  dogBreed.textContent = dog.breed
  dogSex.textContent = dog.sex
  editbttn.textContent = 'Edit Dog'
  editbttn.dataset.id = dog.id
  editbttn.addEventListener('click', e => editDog(e.target.dataset.id))

  table.append(dogName, dogBreed, dogSex, editbttn)
  tbody.append(table)

}

function editDog(id) {
  //console.log(id)
  const input = document.querySelectorAll('input')
  fetchSingleDog(id).then(dog => {
    input[0].placeholder = dog.name
    input[1].placeholder = dog.breed
    input[2].placeholder = dog.sex
  })

  const form = document.querySelector('#dog-form')
  form.addEventListener('submit', e => {
    e.preventDefault()
    let newValue = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value,
    }
    //console.log(`new Value : ${newValue.name}`);
    patchDog(id, newValue)
    const tbody = document.querySelector('#table-body')
    tbody.innerHTML = ''
    fetchAllDog().then(dogs => dogs.forEach(dog => renderDog(dog)))
    form.reset();
  })

}


