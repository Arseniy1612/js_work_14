function makeOrder(name, price){
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: Date.now(),
        name: name,
        price: price,
        date: new Date().toLocaleString()
      };
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
      alert("Замовлення додано!");
    }
    document.getElementById("ordersBtn").onclick = function (){
      document.getElementById("categories").style.display = "none";
      document.getElementById("ordersPage").style.display = "block";
      renderOrders();
    };
    function goBack(){
      document.getElementById("categories").style.display = "block";
      document.getElementById("ordersPage").style.display = "none";
    }
    function renderOrders(){
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const container = document.getElementById("ordersList");
      container.innerHTML = "";
      if(orders.length === 0){
        container.innerHTML = "<p>Замовлень немає</p>";
        return;
      }
      orders.forEach(order => {
        const div = document.createElement("div");
        div.innerHTML = `
          <b>${order.name}</b> - ${order.price} грн <br>
          <small>${order.date}</small><br>
          <button onclick="deleteOrder(${order.id})">Видалити</button>
          <hr>
        `;
        div.onclick = function(e){
          if (e.target.tagName !== "BUTTON") {
            alert("Деталі замовлення:\n" +
                  `Назва: ${order.name}\nЦіна: ${order.price} грн\nДата: ${order.date}`);
          }
        };
        container.appendChild(div);
      });
    }
    function deleteOrder(id){
      let orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders = orders.filter(order => order.id !== id);
      localStorage.setItem("orders", JSON.stringify(orders));
      renderOrders();
    }