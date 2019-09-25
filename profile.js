// This is the user close and open profile function.
// To Minimize the user profile function, click on the menu button twice.
function userProfile() {
    if(hide.style.display === 'block') {
        hide.style.display = 'none';
    } else {
        hide.style.display = 'block';
    }
}

// This is the tweet filter or search function. Please play gently with it.
function searchTweet() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("item");
    tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

// var filter = document.getElementById('search');
// itemList = document.getElementById('item')
// filter.addEventListener('keyup', filterItems);

// function filterItems(e) {
//     var text = e.target.value.toLowerCase();
//     var items =  itemList.getElementsByTagName('tr');

//     Array.from(items).forEach(function(item) {
//         var itemName = item.firstChild.textContent;
//         if(itemName.toLowerCase().indexOf(text) != -1) {
//             item.style.display = 'block';
//         } else {
//             item.style.display = 'none'
//         }
//     })
// }