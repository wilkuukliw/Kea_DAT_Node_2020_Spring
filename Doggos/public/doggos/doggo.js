$(document).ready(function() {
    var url = window.location.href;
    var pathArray = url.split("/");
    var id = pathArray[4];

    $.ajax({
        "url": "/doggo/collection/" + id,
        "type": "GET",
        "datatype": 'json',
        
        "success": function(x) {

            $('#doggos').DataTable({
                data: x.response,

                "ordering": false,
                "paging": false,
                "searching": false,
                "info": false,


                "columnDefs": [{
                    "className": "dt-center",
                    "targets": "_all",
                }],

                columns: [

                    { data: 'id' },

                    { data: 'picture1',
                        "render": function(data, type, row) {
                            return '<img src="' + data + '"  width="500" height="500"/>';
                        }
                    },
                    { data: 'picture2',
                        "render": function(data, type, row) {
                            return '<img src="' + data + '"  width="500" height="500"/>';
                        }
                    },
                    { data: 'picture3',
                        "render": function(data, type, row) {
                            return '<img src="' + data + '" width="500" height="500"/>';
                        }
                    },
                    { data: 'description' }
                ]
            });
        }
    })
});


// The $.get() method requests data from the server with an HTTP GET request.

// Syntax:

// $.get(URL,callback);
// The required URL parameter specifies the URL you wish to request.

// The optional callback parameter is the name of a function to be executed if the request succeeds.

// The following example uses the $.get() method to retrieve data from a file on the server:

// Example
// $("button").click(function(){
//   $.get("demo_test.asp", function(data, status){
//     alert("Data: " + data + "\nStatus: " + status);
//   });
// });