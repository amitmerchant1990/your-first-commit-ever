/*!
	your-first-commit-ever
	(c) 2014 Amit Merchant
	license: GNU LESSER GENERAL PUBLIC LICENSE
	https://github.com/amitmerchant1990/your-first-commit-ever
*/

$(document).ready(function() {
    $('#githubUserName').focus();
    $('#githubUserName').bind('keypress',function(e) {
        var githubUserName = $('#githubUserName').val();
        
        if (e.keyCode==13 && githubUserName != '') {
            $.ajax({
                url: "https://api.github.com/users/" + githubUserName,
                type: "get",
                dataType: 'json',
                success: function(data) {
                    $('#githubContent').empty();
                    $('#githubContent').html('<div><b>GitHub Username:' + data.login + '</b></div><div><img src="' + data.avatar_url + '" height="100" width="100"></div><div><b>GitHub Name:' + data.name + '</b></div>');

                    var githubRepo;

                    $.ajax({
                        url: "https://api.github.com/users/" + githubUserName + "/repos?sort=created&direction=asc&per_page=1",
                        type: "get",
                        dataType: 'json',
                        success: function(data) {
                            $.each(data, function() {
                                githubRepo = this['full_name'];
                                var firstCommitDate = this['pushed_at'];
                                $('#githubContent').append('<div><a href="' + this['html_url'] + '">' + this['full_name'] + '</a></div>');
                                $.ajax({
                                    url: "https://api.github.com/repos/" + githubRepo + "/commits",
                                    type: "get",
                                    dataType: 'json',
                                    success: function(data) {
                                        data = data.reverse();
                                        console.log(data);
                                        $.each(data, function() {
                                            var commit_url = this['html_url'];
                                            var commit_message = this['commit'].message;
                                            var commit_date = this['commit'].committer.date;
                                            $('#githubContent').append('<div><a href="' + commit_url + '">' + commit_message + '</a></div>&nbsp;PUSHED ON&nbsp;<div>' + commit_date + '</div>');
                                            return false;
                                        });
                                    },
                                    error: function() {
                                        alert("failure");
                                    }
                                });
                            });
                        },
                        error: function() {
                            alert("failure");
                        }
                    });
                },
                error: function() {
                    $("#githubContent").html('<div><b>No GitHub user available using this username.</b></div>');
                }
            });
            //alert("test:"+githubRepo);
        }
    });
});