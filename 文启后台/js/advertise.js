$(function() {
	$.ajax({
		type: "post",
		url: "http://47.97.215.64:8882/information/info/getadvertise",
		async: true,
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify({
			page: 1,
			rows: 5
		}),
		success: function(res) {
			console.log(res)
		},
		error: function() {
			console.log("错误")
		}

	});
})