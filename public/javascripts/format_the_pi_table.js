/*
    format_the_pi_table.js
    Pulled in by index.pug for the client-side DataTables setup of the pi table
*/
$(document).ready(function() {
    // console.log( 'Table initialisation start: '+new Date().getTime() );
    var formatter = function (td, cellData, rowData, row, col) {
        $(td).html("<a href='/scanfull/"+cellData+"'>"+cellData+"</a>");
    };
    $('#pi_table').DataTable( {
        data: pitab,
        ordering: false,
        pageLength: 20,
        columns: [
            { title: "X" }, 
            { title: "10", "createdCell": formatter,},
            { title: "20", "createdCell": formatter,},
            { title: "30", "createdCell": formatter,},
            { title: "40", "createdCell": formatter,},
            { title: "50", "createdCell": formatter,},
        ],
        "initComplete": function(settings, json) {
            // console.log( 'Table initialisation end: '+new Date().getTime() );
        },
    } );
} );