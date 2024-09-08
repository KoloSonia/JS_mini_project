async function getUsers(){
   let users = await fetch('https://jsonplaceholder.typicode.com/users')
       .then(response => response.json())
       .then(users => {
           for (let user of users){

               let divUser= document.createElement('div');
               divUser.className='user';
               let cont = document.getElementsByClassName('container');
               cont[0].appendChild(divUser);
               let pId=document.createElement('p');
               let pName = document.createElement('p');
               let aMore=document.createElement('a');
               let div = document.createElement('div');
               pId.textContent = user.id;
               pName.textContent = user.name;
               aMore.textContent="More->";
               aMore.href=`user-details.html?id=${user.id}`;
               div.append(pId,pName);
               divUser.append(div,aMore);
           }
       })
       .catch(error => {
           console.error('Error:', error);
       });
}

getUsers();