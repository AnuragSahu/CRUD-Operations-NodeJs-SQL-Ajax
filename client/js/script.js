$(document).ready(function () {
    "use strict";

    function getUsers() {
        $.ajax({
            url: "/get-users",
            dataType: "json",
            type: "GET",
            success: function (data) {
                console.log(data);
                let newRow = `<table class= "table table-striped" id="users"><tr>
                <th class="id_header"><span>ID</span></th>
                <th class="name_header"><span>First Name</span></th>
                <th class="lastNameHeader"><span>Last Name</span></th>
                <th class="fatherNameHeader"><span>Father's Name</span></th>
                <th class="motherNameHeader"><span>Mother's Name</span></th>
                <th class="sibillingHeader"><span>Number of Siblings</span></th>
                <th class="delete_header"><span>Click to Delete</span></th>
                </tr>`;

                for (let i = 0; i < data.rows.length; i++) {
                    let row = data.rows[i];
                    newRow += ("<tr><td class='identification'>" + row.identification +
                        "</td><td class='firstName'><center></center><span>" + row.firstName +
                        "</span></td><td class='lastName'><center></center><span>" + row.lastName +
                        "</span></td><td class='fatherName'><center></center><span>" + row.fatherName +
                        "</span></td><td class='motherName'><center></center><span>" + row.motherName +
                        "</span></td><td class='siblings'><center></center><span>" + row.siblings +
                        "</span></td><td class='delete'><button id = '" + row.identification + "' class = 'btn btn-danger delBtn'>╳</button> </td></tr>");
                }
                newRow += "</table>";
                $("#container").html(newRow);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p2").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    }
    getUsers();

    $('#submit-btn').click(function (e) {
        e.preventDefault();

        let formData = {
            identification: $("#identification").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            fatherName: $("#fatherName").val(),
            motherName: $("#motherName").val(),
            siblings: $("#siblings").val()
        };
        $("#identification").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#fatherName").val("");
        $("#motherName").val("");
        $("#siblings").val("");
        $.ajax({
            url: "/add-user",
            dataType: "json",
            type: "POST",
            data: formData,
            success: function (data) {
                $("#requestStatus").html("The user's data was added to the database.");
                getUsers();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p2").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

    $('#container').on('click', 'span', function () {

        if ($(this).parent().attr('class') === 'motherName') {
            let spanText = $(this).text();
            let td = $(this).parent();
            let input = $("<input type='text' value='" + spanText + "'>");

            td.html(input);
            $(input).keyup(function (e) {
                let val = null;
                let span = null;
                if (e.which == 13) {
                    val = $(input).val();
                    span = $("<span>" + val + "</span>");
                    td.html(span);

                    console.log(td.parent().find("[class='identification']")[0]);

                    let dataToServer = {
                        id: td.parent().find("[class='identification']").html(),
                        motherName: val
                    };

                    $.ajax({
                        url: "update-motherName",
                        dataType: "json",
                        type: "POST",
                        data: dataToServer,
                        success: function (data) {
                            $("#requestStatus").html("The data was updated on the database.");
                            getUsers();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#p2").text(jqXHR.statusText);
                            console.log("ERROR:", jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            });
        }
    });

    $('#container').on('click', 'span', function () {

        if ($(this).parent().attr('class') === 'firstName') {
            let spanText = $(this).text();
            let td = $(this).parent();
            let input = $("<input type='text' value='" + spanText + "'>");

            td.html(input);
            $(input).keyup(function (e) {
                let val = null;
                let span = null;
                if (e.which == 13) {
                    val = $(input).val();
                    span = $("<span>" + val + "</span>");
                    td.html(span);

                    console.log(td.parent().find("[class='identification']")[0]);

                    let dataToServer = {
                        id: td.parent().find("[class='identification']").html(),
                        firstName: val
                    };

                    $.ajax({
                        url: "update-firstName",
                        dataType: "json",
                        type: "POST",
                        data: dataToServer,
                        success: function (data) {
                            $("#requestStatus").html("The data was updated on the database.");
                            getUsers();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#p2").text(jqXHR.statusText);
                            console.log("ERROR:", jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            });
        }
    });

    $('#container').on('click', 'span', function () {

        if ($(this).parent().attr('class') === 'lastName') {
            let spanText = $(this).text();
            let td = $(this).parent();
            let input = $("<input type='text' value='" + spanText + "'>");

            td.html(input);
            $(input).keyup(function (e) {
                let val = null;
                let span = null;
                if (e.which == 13) {
                    val = $(input).val();
                    span = $("<span>" + val + "</span>");
                    td.html(span);

                    console.log(td.parent().find("[class='identification']")[0]);

                    let dataToServer = {
                        id: td.parent().find("[class='identification']").html(),
                        lastName: val
                    };

                    $.ajax({
                        url: "update-lastName",
                        dataType: "json",
                        type: "POST",
                        data: dataToServer,
                        success: function (data) {
                            $("#requestStatus").html("The data was updated on the database.");
                            getUsers();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#p2").text(jqXHR.statusText);
                            console.log("ERROR:", jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            });
        }
    });

    $(document).on('click', '.delBtn', function(){

        let deleteButton = $(this);

        console.log(deleteButton.attr('id'));

        let dataToServer = {
            identification: deleteButton.attr('id')
        };
        // id: td.parent().find("[class='identification']").html()
        $.ajax({
            url: "/delete-user",
            dataType: "json",
            type: "POST",
            data: dataToServer,
            success: function (data) {
                console.log(data);
                $("#status").html("Record Deleted");
                getUsers();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p2").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }

        });
    });

    $('#container').on('click', 'span', function () {

        if ($(this).parent().attr('class') === 'fatherName') {
            let spanText = $(this).text();
            let td = $(this).parent();
            let input = $("<input type='text' value='" + spanText + "'>");

            td.html(input);
            $(input).keyup(function (e) {
                let val = null;
                let span = null;
                if (e.which == 13) {
                    val = $(input).val();
                    span = $("<span>" + val + "</span>");
                    td.html(span);

                    console.log(td.parent().find("[class='identification']")[0]);

                    let dataToServer = {
                        id: td.parent().find("[class='identification']").html(),
                        fatherName: val
                    };

                    $.ajax({
                        url: "update-userfatherName",
                        dataType: "json",
                        type: "POST",
                        data: dataToServer,
                        success: function (data) {
                            $("#requestStatus").html("The data was updated on the database.");
                            getUsers();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#p2").text(jqXHR.statusText);
                            console.log("ERROR:", jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            });
        }
    });

    // $('#container').on('click', 'span', function () {

    //     if ($(this).parent().attr('class') === 'fatherName') {
    //         let spanText = $(this).text();
    //         let td = $(this).parent();
    //         let input = $("<input type='text' value='" + spanText + "'>");

    //         td.html(input);
    //         $(input).keyup(function (e) {
    //             let val = null;
    //             let span = null;
    //             if (e.which == 13) {
    //                 val = $(input).val();
    //                 span = $("<span>" + val + "</span>");
    //                 td.html(span);

    //                 console.log(td.parent().find("[class='identification']")[0]);

    //                 let dataToServer = {
    //                     id: td.parent().find("[class='identification']").html(),
    //                     emission: val
    //                 };

    //                 $.ajax({
    //                     url: "update-userfatherName",
    //                     dataType: "json",
    //                     type: "POST",
    //                     data: dataToServer,
    //                     success: function (data) {
    //                         $("#requestStatus").html("The data was updated on the database.");
    //                         getUsers();
    //                     },
    //                     error: function (jqXHR, textStatus, errorThrown) {
    //                         $("#p2").text(jqXHR.statusText);
    //                         console.log("ERROR:", jqXHR, textStatus, errorThrown);
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });

    $('#container').on('click', 'span', function () {

        if ($(this).parent().attr('class') === 'siblings') {
            let spanText = $(this).text();
            let td = $(this).parent();
            let input = $("<input type='text' value='" + spanText + "'>");

            td.html(input);
            $(input).keyup(function (e) {
                let val = null;
                let span = null;
                if (e.which == 13) {
                    val = $(input).val();
                    span = $("<span>" + val + "</span>");
                    td.html(span);

                    console.log(td.parent().find("[class='identification']")[0]);

                    let dataToServer = {
                        id: td.parent().find("[class='identification']").html(),
                        siblings: val
                    };

                    $.ajax({
                        url: "update-usersiblings",
                        dataType: "json",
                        type: "POST",
                        data: dataToServer,
                        success: function (data) {
                            $("#requestStatus").html("The data was updated on the database.");
                            getUsers();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#p2").text(jqXHR.statusText);
                            console.log("ERROR:", jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            });
        }
    });


});