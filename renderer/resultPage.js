const  cutStr = (str) =>{
    if (str.length <= 25) {
        return str; // Return the original string if it's 15 characters or less
    } else {
        return str.substring(0, 25) + "..."; // Truncate the string and add ellipsis
    }
}


// selectors 
const xlBtn = document.getElementById('xl-btn');
const scrapeReviewsBtn = document.getElementById('scrapReviewsBtn');
const selectAllItemsCheckbox = document.querySelector('.select-all-items-checkbox');

// rows numbers
const rowsNumSection = document.querySelector('#rows-num strong');
const timeSection = document.querySelector('#time-section strong');

// table 
let table  = document.querySelector('.table tbody');

window.data.allData((data)=>{
    
    rowsNumSection.innerText = data.length
    data.forEach((item,i ) => {
        // Create HTML content for the <p> element
        const row = 
        ` 
          <tr>
        <th scope="row">${i + 1}</th>
        <td>
        <a target="_blank" alt="${item['Map Url']}" href="${item['Map Url']}">
        ${cutStr(item['Map Url'])}
        </a>
        </td>
        <td>${item['Place Name']}
        </td>
        <td>${item['rating']}
        </td>
        <td>${item['Number Of Reviews']}</td>
        <td>
        <a  target="_blank" href="${item['Website']}">
        ${cutStr(item['Website'])}
        </a>
        </td>
    
        <td>${item['Phone Number']}</td>
        <td>${cutStr(item['Address'])}</td>
        <td>=> <input type="checkbox" class="item-checkbox"/><td/>
      </tr>
      
    `

        // Insert the HTML content into the output div
        table.insertAdjacentHTML('beforeend', row);
    });
})

window.data.timeExecuted((time)=>{
    timeSection.innerText = time
})



xlBtn.addEventListener('click', (e)=>{
    e.preventDefault();

     window.downloadProcess.download('xl');
})



selectAllItemsCheckbox.addEventListener('change', (e)=>{
    const itemsCheckboxes  = document.querySelectorAll('.item-checkbox')
    console.log('checked')
    for(let i = 0 ; i < itemsCheckboxes.length; i++){
        console.log(selectAllItemsCheckbox.checked);
        console.log(itemsCheckboxes[i].checked)
        selectAllItemsCheckbox.checked ? itemsCheckboxes[i].checked = true : itemsCheckboxes[i].checked = false
    }
})


scrapeReviewsBtn.addEventListener('click', (e)=>{

    // check if all data selected 


    // collect selected data

})