document.addEventListener('DOMContentLoaded', () => {
    
    const datePicker = document.getElementById('serviceDate');
    const warningIcon = document.getElementById('warningIcon');
    const screenMsg = document.getElementById('screenMessage');
    const fireInput = document.getElementById('input-fire');
    const fireWarning = document.getElementById('fire-warning');
    const saveBtn = document.getElementById("btn-save");


    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
        console.error("No token found! Please log in again.");
        window.location.href = 'index.html';
        return;
    }

    
    function showSuccessMessage() {
        const popup = document.getElementById('success-popup');
        if (popup) {
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }
    }

    

    
    if (fireInput) {
        fireInput.addEventListener('change', () => {
            const selectedValue = fireInput.value;
            if (!selectedValue) return;

            const [year, month] = selectedValue.split('-').map(Number);
            const fDate = new Date(year, month - 1); // Renamed to fDate
            
            const today = new Date();
            const currentMonth = new Date(today.getFullYear(), today.getMonth());

            if (fDate <= currentMonth) {
                fireWarning.style.display = "block";
                fireInput.style.backgroundColor = "#ffcccc";
                fireInput.style.border = "2px solid red";
            } else {
                fireWarning.style.display = "none";
                fireInput.style.backgroundColor = "";
                fireInput.style.border = "";
            }
        });
    }
    
    
    if (datePicker) {
        datePicker.addEventListener('change', () => {
            const sDate = new Date(datePicker.value); // Renamed to sDate
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            sDate.setHours(0, 0, 0, 0);

            const diffTime = sDate.getTime() - today.getTime();
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 7 && datePicker.value !== "") {
                screenMsg.style.display = "block";
                if(warningIcon) warningIcon.style.display = "inline-block";
                datePicker.style.backgroundColor = "#ffcccc";
            } else {
                screenMsg.style.display = "none";
                if(warningIcon) warningIcon.style.display = "none"; 
                datePicker.style.backgroundColor = "";
            }
        });
    }

    
    document.querySelectorAll('.inputs').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length > 7) {
                this.value = this.value.slice(0, 7);
                this.style.backgroundColor = "#ffcccc";
            } else {
                this.style.backgroundColor = "";
            }
        });
    });

    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = "index.html";
    });

    
    if (saveBtn) {
        saveBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const token = localStorage.getItem('token');

            const userData = {
                serviceDate: document.getElementById('serviceDate').value,
                currentMiles: document.getElementById('input-miles').value,
                oilMiles: document.getElementById('input-oil').value,
                airMiles: document.getElementById('input-air').value,
                brakeMiles: document.getElementById('input-brake').value,
                coolingMiles: document.getElementById('input-cooling').value,
                sparkMiles: document.getElementById('input-spark').value,
                fuelMiles: document.getElementById('input-fuel').value,
                note1: document.getElementById('input-note1').value,
                suspMiles: document.getElementById('input-susp').value,
                note2: document.getElementById('input-note2').value,
                fireDate: document.getElementById('input-fire').value
            };

            try {
                const response = await fetch('http://127.0.0.1:3000/api/save-service', {
                    method: 'POST',
                    headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    showSuccessMessage();

                    datePicker.dispatchEvent(new Event('change'));
                if (fireInput) fireInput.dispatchEvent(new Event('change'));
                } else {
                    const errorData = await response.json();
                    alert("Error saving: " + (errorData.error || "Unauthorized"));
                }

                } catch (err) {
                    console.error("Server connection failed:", err);
                }
            });
        }
    
    async function loadLatestData() {
    
    const token = localStorage.getItem('token');

    try {
        
        const response = await fetch('http://127.0.0.1:3000/api/get-latest', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.warn("Unauthorized access or server error.");
            return;
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
            document.getElementById('serviceDate').value = data.serviceDate || "";
            document.getElementById('input-miles').value = data.currentMiles || "";
            document.getElementById('input-oil').value = data.oilMiles || "";
            document.getElementById('input-air').value = data.airMiles || "";
            document.getElementById('input-brake').value = data.brakeMiles || "";
            document.getElementById('input-cooling').value = data.coolingMiles || "";
            document.getElementById('input-spark').value = data.sparkMiles || "";
            document.getElementById('input-fuel').value = data.fuelMiles || "";
            document.getElementById('input-susp').value = data.suspMiles || "";
            document.getElementById('input-note1').value = data.note1 || "";
            document.getElementById('input-note2').value = data.note2 || "";
            document.getElementById('input-fire').value = data.fireDate || "";
            
            console.log("Latest data loaded from MongoDB");

            
            datePicker.dispatchEvent(new Event('change'));
            if(fireInput) fireInput.dispatchEvent(new Event('change'));
            }
            } catch (err) {
            console.error("Fetch failed:", err);
        }
    }


loadLatestData();
    
});