
AFRAME.registerComponent("enemy-fireballs", {
    init: function () {        
        setInterval(this.shootEnemyMonster, 2000)
    },
    shootEnemyMonster: function () {
        //Elegir la escena y guardarla en una variable
        var scene = document.querySelector("#scene");
        

        //Elegir a todos los mounstros
        var els = document.querySelectorAll(".enemy");

        //Ciclo para crear bolas que disparen cada mounstro
        for (var i = 0; i < els.length; i++) {
        
       //Crear entidad para bola de fuego
       var enemyfireBall = document.createElement("a-entity");
        
       //Atributo de clase para la bola
       enemyfireBall.setAttribute("class", "fireball");

       enemyfireBall.setAttribute("gltf-model", "./models/fireball/scene.gltf");

                
        //Establecer el atributo del cuerpo dinámico
        enemyfireBall.setAttribute("dynamic-body", {shape: "sphere", mass: "0"})
         

       var position = els[i].getAttribute("position")

       enemyfireBall.setAttribute("position", {
        x: position.x,
        y: position.y,
        z: position.z,
        });

        enemyfireBall.setAttribute("scale", {x: 0.05, y: 0.05, z:+ 0.05 })


        scene.appendChild(enemyfireBall);

         //Three.js Vector Variables
         var vector1 = new THREE.Vector3()
         var vector2 = new THREE.Vector3()

         //Obtener la posición del enemigo y jugador usando el método Three.js
         var positionEnemy = els[i].object3D
         var positionMe = document.querySelector("#weapon").object3D

         positionEnemy.getWorldPosition(vector2)
         positionMe.getWorldPosition(vector1)

         //Establecer la velocidad y su dirección
         var vector3 = new THREE.Vector3()
         vector3.subVectors(vector1, vector2).normalize()
         enemyfireBall.setAttribute("velocity", vector3.multiplyScalar(20))



         //Obtener atributo de texto
         var lifeCountText = document.querySelector("#countLife")
         var lifeText = parseInt(lifeCountText.getAttribute("text").value)
     
    }
       

        /******************************************************************************************* */

        //Obtener el valor de cuantas vidas tiene el jugador
        

        //eventos de colisión con balas enemigas(fireball es el nombre de la bola de fuego)
        fireball.addEventListener("collide", function (e) {
           
            if (e.detail.body.el.id === "weapon") {               
                if (lifeText > 0) {
                    //Restar vidas y actualizar texto
                    lifeText -= 1
                    lifeCountText.setAttribute("text", {value: lifeText})
                    
                }
                if (lifeText <= 0) {
                    //mostrar texto de over
                    var gameOver = document.querySelector("#over")
                    gameOver.setAttribute("visible", true)

                    //eliminar monstruos
                    var removeEnemy = document.querySelectorAll(".enemy")
                    for(var i = 0; i< removeEnemy.length; i++){
                        scene.removeChild(removeEnemy)
                    }
                    

                    
                }

            }
        });

    
    },
    

});
