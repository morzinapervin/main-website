window.addEventListener('DOMContentLoaded', () => {
  (function() {
    // Setup canvas
    let canvas = document.querySelector('canvas');
    let c = canvas.getContext('2d');

    // Get the dimensions of the container element
    let container = document.querySelector('.approach-combined-wrap');
    function setCanvasDimensions() {
      const containerRect = container.getBoundingClientRect();
      canvas.width = containerRect.width;
      canvas.height = containerRect.height;
    }
    setCanvasDimensions(); // Set initial dimensions

    // Hexagon dimensions
    const maxHexHeight = 54; // Maximum height of hexagon
    const minHexHeight = 15; // Minimum height of hexagon
    const maxHexRadius = maxHexHeight / 2;
    const minHexRadius = minHexHeight / 2;

    const visualGap = 4; // Desired visual gap around hexagons

    // Center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculate the spotlight radius based on canvas width
    function calculateSpotlightRadius() {
      const maxSpotlightRadius = 400; // Spotlight radius set to 400px
      const referenceWidth = 2560; // Reference width for the maximum radius
      return (canvas.width / referenceWidth) * maxSpotlightRadius;
    }

    let spotlightRadius = calculateSpotlightRadius(); // Initial spotlight radius

    // Hexagon class definition
    function Hexagon(x, y, size, color, isCenter) {
      this.radius = size / 2;
      this.x = x;
      this.y = y;
      this.color = color; // Hexagon color
      this.isCenter = isCenter; // Whether the hexagon is at the center
      this.rotationAngle = Math.PI / 2; // Rotate by 90° (in radians)
      this.opacity = 0; // Start with opacity 0

      // Draw method for hexagon
      this.draw = function() {
        if (this.opacity <= 0) return; // Skip drawing if the hexagon is fully transparent

        c.save(); // Save the current canvas state
        c.translate(this.x, this.y); // Move the canvas origin to the hexagon's center
        c.rotate(this.rotationAngle); // Rotate the canvas by 90°

        c.globalAlpha = this.opacity; // Set opacity
        c.beginPath();
        c.moveTo(
          this.radius * Math.sin(0),
          this.radius * Math.cos(0)
        );
        for (var side = 0; side < 7; side++) {
          c.lineTo(
            this.radius * Math.sin((side * 2 * Math.PI) / 6),
            this.radius * Math.cos((side * 2 * Math.PI) / 6)
          );
        }
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 3; // Border width set to 3px
        c.strokeStyle = '#E5EFEF';
        c.stroke();

        c.restore(); // Restore the canvas to its original state
      };

      // Update method for hexagon
      this.update = function() {
        // Get the distance from the pointer
        const a = pointer.delayed.x - this.x;
        const b = pointer.delayed.y - this.y;
        const dist = Math.sqrt(a * a + b * b);

        if (mouse.isInside && dist <= spotlightRadius) {
          // Calculate hexagon size based on distance
          const sizeRange = maxHexRadius - minHexRadius;
          this.radius = minHexRadius + Math.max(0, sizeRange * (1 - dist / spotlightRadius));
          
          // Update opacity based on distance
          this.opacity = Math.max(0.4, 1 - dist / spotlightRadius); // Minimum opacity of 40%
        } else {
          // Smoothly reduce opacity and size when outside the spotlight
          this.opacity = Math.max(0, this.opacity - 0.02); // Gradually decrease opacity
          this.radius = Math.max(0, this.radius - 0.5); // Gradually decrease radius
        }

        this.draw();
      };
    }

    // Array to store hexagon instances
    let hexArr = [];

    // Function to draw grid of hexagons
    function drawGrid() {
      const columnGap = maxHexRadius * Math.sqrt(3) - visualGap - 8 + 5; 
      const rowGap = maxHexRadius * 1.5 + 5; // Increased row gap

      // Calculate number of columns and rows with updated gaps
      const cols = Math.ceil(canvas.width / columnGap);
      const rows = Math.ceil(canvas.height / rowGap);

      // Define colors for sections
      const leftColor = '#DCE8E3';
      const middleColor = '#E0EAF1';
      const rightColor = '#E2E7E7';

      hexArr = []; // Clear existing hexagons

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const xBase = i * columnGap; // Apply column gap
          const yBase = j * rowGap + (i % 2) * (maxHexRadius * 0.75); // Apply row gap

          // Adjust hexagon position based on dynamic gap
          const x = xBase;
          const y = yBase;

          // Check if the hexagon is near the center of the canvas
          const isCenter = Math.abs(x - canvas.width / 2) < maxHexRadius && Math.abs(y - canvas.height / 2) < maxHexRadius;

          // Assign color based on the x position
          let color;
          if (x < canvas.width / 3) {
            color = leftColor;
          } else if (x < 2 * canvas.width / 3) {
            color = middleColor;
          } else {
            color = rightColor;
          }

          // Create hexagons with an initial size of 0 (they will scale up dynamically)
          hexArr.push(new Hexagon(x, y, minHexHeight, color, isCenter));
        }
      }
    }
    drawGrid();

    // Mouse pointer tracking
    var mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      isInside: false // Start with mouse outside the canvas
    };

    // Update mouse position and state
    window.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Check if the mouse is within the canvas boundaries
      mouse.isInside = mouse.x >= 0 && mouse.x <= canvas.width && mouse.y >= 0 && mouse.y <= canvas.height;

      if (mouse.isInside) {
        // Ensure the spotlight stays within the canvas
        mouse.x = Math.max(spotlightRadius, Math.min(mouse.x, canvas.width - spotlightRadius));
        mouse.y = Math.max(spotlightRadius, Math.min(mouse.y, canvas.height - spotlightRadius));
      }
    });

    // Smoothly fade out hexagons when the mouse leaves the canvas area
    canvas.addEventListener('mouseleave', function() {
      mouse.isInside = false;
    });

    // Pointer class definition
    function Pointer(x, y) {
      this.x = x;
      this.y = y;
      this.delayed = { x: x, y: y };

      // Draw pointer
      this.draw = function() {
        c.beginPath();
        c.arc(this.delayed.x, this.delayed.y, 5, 0, Math.PI * 2, false);
      };

      // Update pointer position
      this.update = function() {
        if (mouse.isInside) {
          this.delayed.x += (mouse.x - this.delayed.x) * 0.04;
          this.delayed.y += (mouse.y - this.delayed.y) * 0.04;
        } else {
          this.delayed.x += (centerX - this.delayed.x) * 0.04;
          this.delayed.y += (centerY - this.delayed.y) * 0.04;
        }
        this.draw();
      };
    }
    const pointer = new Pointer(mouse.x, mouse.y);

    // Animation loop for canvas
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < hexArr.length; i++) {
        hexArr[i].update();
      }

      pointer.update();
    }
    animate();

    // Resize event handler
    window.addEventListener('resize', function() {
      setCanvasDimensions(); // Update dimensions based on the container
      spotlightRadius = calculateSpotlightRadius(); // Update spotlight radius based on new dimensions
      hexArr = [];
      drawGrid(); // Redraw grid on resize
      // Re-center the pointer
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      pointer.delayed.x = mouse.x;
      pointer.delayed.y = mouse.y;
    });
  })();
});
