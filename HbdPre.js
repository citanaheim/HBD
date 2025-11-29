document.getElementById("YupBtn").addEventListener("click", function () {
    document.getElementById("container").innerHTML = `
      <h1>What do I call you?</h1>
      <input type="text" id="nicknameInput" placeholder="Enter your nickname" />
      <button id="submitName">Submit</button>
    `;
  
    // Re-bind the new Submit button after DOM update
    document.getElementById("submitName").addEventListener("click", function () {
      const nickname = document.getElementById("nicknameInput").value;
  
      document.getElementById("container").innerHTML = `
        <img src="cake1.PNG" alt="Birthday Cake" id="cakeImage" />
        <h1 id="birthdayMessage">Happy Birthday, ${nickname}!</h1>
  
        <!-- Hidden YouTube player -->
        <iframe
          id="hiddenPlayer"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/vhVBWw6rId0?enablejsapi=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen
          style="display: none;">
        </iframe>
  
        <!-- Play button -->
        <button id="playYTSong">🎵</button>
  
        <!-- Make a Wish button (initially hidden) -->
        <button id="wishBtn" style="display: none;">Make a Wish</button>
      `;
  
      // Animate cake image
      let frame = 1;
      const anim = setInterval(() => {
        frame = frame < 4 ? frame + 1 : 1;
        document.getElementById("cakeImage").src = `cake${frame}.png`;
      }, 740);
  
      // Wait for YouTube iframe to load before binding the player
      setTimeout(() => {
        const player = new YT.Player('hiddenPlayer', {
          events: {
            onStateChange: function (event) {
              if (event.data === 0) {
                document.getElementById("playYTSong").style.display = "none";
                document.getElementById("wishBtn").style.display = "inline-block";
              }
            }
          }
        });
  
        // Play music button
        document.getElementById("playYTSong").addEventListener("click", function () {
          player.playVideo();
        });
  
        // Make a wish button with countdown
       // Make a wish button with countdown
        document.getElementById("wishBtn").addEventListener("click", function () {
            let countdown = 30;
            const wishBtn = this;
            wishBtn.disabled = true;
        
            const countdownInterval = setInterval(() => {
            wishBtn.textContent = `close ur eyes ${countdown}s`;
            countdown--;
        
            if (countdown < 0) {
                clearInterval(countdownInterval);
        
                // Remove the wish button
                wishBtn.remove();
        
                // Add Blow Candle button
                const blowBtn = document.createElement("button");
                blowBtn.textContent = "Blow Your Candle";
                blowBtn.id = "blowBtn";
                document.getElementById("container").appendChild(blowBtn);
        
                // Blow button logic
                blowBtn.addEventListener("click", () => {
                // Stop the animation
                clearInterval(anim);
        
                // Change cake image
                document.getElementById("cakeImage").src = "cake_blown.png";

                // Add message below birthday greeting
                const bdayMessage = document.getElementById("birthdayMessage");
                bdayMessage.innerHTML = `hbd ule, ${nickname}! humayo ka't magparami. tc always :>`;

        
                // Confetti
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });
        
                blowBtn.disabled = true;
                blowBtn.textContent = "I love you okei? ";
                });
            }
            }, 1000);
        });
        

  
      }, 300); // wait a bit for iframe to load
    });
  });
  
  document.getElementById("NopeBtn").addEventListener("click", function () {
    alert("Ok lang yan, advance or belated na lang 😄");
  });
  
