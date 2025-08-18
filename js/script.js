// ===== Form Validation =====
function validateForm(formId) {
    let form = document.getElementById(formId);
    let inputs = form.querySelectorAll("input[required]");
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert("Please fill out all required fields.");
            return false;
        }
    }
    alert("✅ Form submitted successfully!");
    return true;
}
