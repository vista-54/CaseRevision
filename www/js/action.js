var data = window.parent.global_data;

var form = document.createElement("form");
form.action = "https://secure-test.worldpay.com/wcc/purchase";
form.method = "POST";
//form.target = "_system";
for (var key in data) {
    var input = document.createElement("input");
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
}
form.style.display = 'none';
document.body.appendChild(form);
form.submit();




