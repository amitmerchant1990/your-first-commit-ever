/*!
    your-first-commit-ever
    (c) 2020 Amit Merchant <bullredeyes@gmail.com>
    license: GENERAL PUBLIC LICENSE
    https://github.com/amitmerchant1990/your-first-commit-ever
*/

$(document).ready(function () {
    let params = (new URL(document.location)).searchParams;
    let user = params.get('user');

    if (user != null) {
        fetchUserCommits(user);
        $('#githubUserName').val(user);
    }

    $('#githubUserName').focus();
    $('#githubUserName').bind('keypress', function (e) {
        let githubUserName = $('#githubUserName').val();

        if (e.keyCode == 13 && githubUserName != '') {
            fetchUserCommits(githubUserName);
            let searchParams = new URLSearchParams(window.location.search);
            searchParams.set("user", githubUserName);
            window.location.search = searchParams.toString();
        }
    });

    function fetchUserCommits(user) {
        $.ajax({
            url: "https://api.github.com/search/commits?q=author:" + user + "&order=asc&sort=committer-date",
            type: "get",
            headers: {
                'Accept': 'application/vnd.github.cloak-preview'
            },
            dataType: 'json',
            success: function (data) {
                $('#githubContent').empty();

                let date = new Date(data.items[0].commit.committer.date);

                let html =
                    `<div class="flex-left">
                    <img src="${data.items[0].author.avatar_url}" class="img-responsive">
                </div>
                <div class="flex-right">
                    <div class="greetings">
                        <b>Hey, <a href="${data.items[0].committer.html_url}">${data.items[0].commit.author.name}</a></b>
                    </div>
                    <div>
                        <p>Here's your first ever commit on GitHub: <a href="${data.items[0].html_url}">${data.items[0].commit.message}</a></p>  
                    </div>
                    <div>
                        <p>That you have committed in <a href="https://github.com/${data.items[0].repository.full_name}">${data.items[0].repository.full_name}</a></p>
                    </div>
                    <div>
                        <p>On <i>${date.toString()}</i></p>
                    </div>
                    <div>
                        <p>Cheers! 🍻</p>
                    </div>
                </div>`;

                $('#githubContent').html(html).css('background-color', 'white');
            },
            error: function () {
                $("#githubContent").html('<div class="no-user"><p><i>No GitHub user available of this username.</i></p></div>');
            }
        });
    }
});