const  cutStr = (str) =>{
    if (str.length <= 25) {
        return str; // Return the original string if it's 15 characters or less
    } else {
        return str.substring(0, 25) + "..."; // Truncate the string and add ellipsis
    }
}

const xlBtn = document.getElementById('xl-btn');
const pageContent = document.getElementById('content');
const timeSection = document.querySelector('#time-section strong');

window.data.data_reviews((data)=>{
  data = data.filter((d)=> d.reviews.length > 0)
    data.forEach((item,index ) => {

        const tableHtml = `<table class="table" id="table-${index}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Rating</th>
            <th scope="col">Profile Link</th>
            <th scope="col">Reviews Date</th>
            <th scope="col">Content</th>
          </tr>
        </thead>
        <tbody class="fs-6">
        
        </tbody>
      </table>`
      pageContent.insertAdjacentHTML('beforeend', tableHtml);

      let table  = document.querySelector(`#table-${index} tbody`);
      // 
      table.parentNode.insertAdjacentHTML('beforebegin', `<p class="h4 mt-4"><span class="h5"> Place Name : </span>${item['Place Name']}</p>`);
      table.parentNode.insertAdjacentHTML('beforebegin', `<p class="h4 mb-4"><span class="h5"> Map Url : </span> <a  target="_blank" href="${item['Map Url']}">${cutStr(item['Map Url'])}</a></p>`);
        for(let i = 0; i < item.reviews.length; i++){
            const row = 
        ` 
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${item.reviews[i]['User Name']}
        </td>
        <td>${item.reviews[i]['User Rating']}</td>
        <td>
        <a  target="_blank" href="${item.reviews[i]['Profile Link']}">
        ${cutStr(item.reviews[i]['Profile Link'])}
        </a>
        </td>
        <td>${item.reviews[i]['Review Date']}</td>
        <td>${item.reviews[i]['Review Content']}</td>
      </tr>
      
    `
    document.querySelector(`#table-${index} tbody`).insertAdjacentHTML('beforeend', row);
        }

        
    });
})


xlBtn.addEventListener('click', (e)=>{

    e.preventDefault();
    window.downloadProcess.downloadReviews('');

})

window.data.reviewsTimeExecuted((time)=>{
  timeSection.innerText = time
})

