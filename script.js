// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Recipe card interactions
document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTA Button click handler
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#recipes').scrollIntoView({
        behavior: 'smooth'
    });
});

// Recipe button click handlers
document.querySelectorAll('.recipe-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const recipeTitle = this.closest('.recipe-card').querySelector('h3').textContent;
        
        // Create a simple modal for recipe details
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        // Get recipe details based on title
        const recipeDetails = getRecipeDetails(recipeTitle);
        
        modalContent.innerHTML = `
            <button style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #ff6b6b;
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                font-size: 1.2rem;
            " onclick="this.closest('.modal').remove()">×</button>
            <h2 style="color: #333; margin-bottom: 1rem; text-align: center;">${recipeDetails.title}</h2>
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <span style="font-size: 3rem;">${recipeDetails.emoji}</span>
                <p style="color: #ff6b6b; font-weight: 600; margin-top: 0.5rem;">${recipeDetails.time}</p>
            </div>
            <h3 style="color: #333; margin-bottom: 1rem;">Ingredients:</h3>
            <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                ${recipeDetails.ingredients.map(ingredient => `<li style="margin-bottom: 0.5rem; color: #666;">${ingredient}</li>`).join('')}
            </ul>
            <h3 style="color: #333; margin-bottom: 1rem;">Instructions:</h3>
            <ol style="padding-left: 1.5rem;">
                ${recipeDetails.instructions.map(instruction => `<li style="margin-bottom: 0.8rem; color: #666; line-height: 1.5;">${instruction}</li>`).join('')}
            </ol>
            <div style="text-align: center; margin-top: 2rem;">
                <button style="
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                " onclick="this.closest('.modal').remove()">Close</button>
            </div>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Function to get recipe details
function getRecipeDetails(title) {
    const recipes = {
        'Rainbow Quinoa Bowl': {
            title: 'Rainbow Quinoa Bowl',
            emoji: '🥗',
            time: '⏱️ 15 minutes',
            ingredients: [
                '1 cup quinoa',
                '2 cups water',
                '1 bell pepper (diced)',
                '1 cucumber (diced)',
                '1 avocado (sliced)',
                '2 tbsp tahini',
                '1 tbsp lemon juice',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Cook quinoa according to package instructions',
                'While quinoa cooks, dice the bell pepper and cucumber',
                'Mix tahini with lemon juice and a pinch of salt',
                'Combine cooked quinoa with vegetables',
                'Top with avocado slices and drizzle with tahini dressing',
                'Season with salt and pepper'
            ]
        },
        'Veggie Scramble': {
            title: 'Veggie Scramble',
            emoji: '🍳',
            time: '⏱️ 10 minutes',
            ingredients: [
                '3 eggs',
                '1 cup fresh spinach',
                '1 tomato (diced)',
                '1/4 cup shredded cheese',
                '1 tbsp olive oil',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Heat olive oil in a non-stick pan over medium heat',
                'Add spinach and cook until wilted',
                'Beat eggs in a bowl with salt and pepper',
                'Pour eggs into the pan with spinach',
                'Add diced tomatoes and scramble gently',
                'Top with cheese and serve immediately'
            ]
        },
        'Green Smoothie': {
            title: 'Green Smoothie',
            emoji: '🥤',
            time: '⏱️ 5 minutes',
            ingredients: [
                '2 cups fresh spinach',
                '1 banana',
                '1/2 cup mixed berries',
                '1 cup almond milk',
                '1 tbsp honey (optional)',
                '1/2 cup ice'
            ],
            instructions: [
                'Add spinach to blender first',
                'Add banana, berries, and almond milk',
                'Blend on high for 30 seconds',
                'Add ice and blend until smooth',
                'Taste and add honey if desired',
                'Pour into glass and enjoy immediately'
            ]
        },
        'Black Bean Tacos': {
            title: 'Black Bean Tacos',
            emoji: '🌮',
            time: '⏱️ 20 minutes',
            ingredients: [
                '1 can black beans (drained)',
                '6 corn tortillas',
                '1 avocado (sliced)',
                '1 lime (juiced)',
                '1/2 red onion (diced)',
                '1/4 cup cilantro',
                '1 tsp cumin',
                'Salt to taste'
            ],
            instructions: [
                'Heat black beans in a pan with cumin and salt',
                'Warm tortillas in a dry pan or microwave',
                'Mash half the beans slightly for texture',
                'Fill tortillas with beans',
                'Top with avocado, onion, and cilantro',
                'Drizzle with lime juice and serve'
            ]
        },
        'Zucchini Pasta': {
            title: 'Zucchini Pasta',
            emoji: '🍝',
            time: '⏱️ 25 minutes',
            ingredients: [
                '3 medium zucchinis',
                '2 cups marinara sauce',
                '2 cloves garlic (minced)',
                '2 tbsp olive oil',
                '1/4 cup fresh basil',
                '1/4 cup parmesan cheese',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Spiralize zucchinis into noodle shapes',
                'Heat olive oil in a large pan',
                'Add garlic and cook for 1 minute',
                'Add zucchini noodles and cook for 3-4 minutes',
                'Add marinara sauce and heat through',
                'Top with basil and parmesan cheese'
            ]
        },
        'Mediterranean Wrap': {
            title: 'Mediterranean Wrap',
            emoji: '🥙',
            time: '⏱️ 12 minutes',
            ingredients: [
                '2 whole wheat tortillas',
                '1/2 cup hummus',
                '1 cucumber (sliced)',
                '1/4 cup feta cheese',
                '1/4 cup kalamata olives',
                '1/4 cup red onion (sliced)',
                '2 tbsp olive oil',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Warm tortillas slightly',
                'Spread hummus evenly on tortillas',
                'Layer cucumber, feta, olives, and onion',
                'Drizzle with olive oil',
                'Season with salt and pepper',
                'Roll tightly and slice in half'
            ]
        }
    };
    
    return recipes[title] || {
        title: title,
        emoji: '🍽️',
        time: '⏱️ 15 minutes',
        ingredients: ['Recipe details coming soon!'],
        instructions: ['Check back later for full instructions!']
    };
}

// Add some fun animations on page load
window.addEventListener('load', function() {
    // Animate recipe cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe tip cards
    document.querySelectorAll('.tip-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add a fun confetti effect for the CTA button
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            z-index: 10000;
            pointer-events: none;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * 360;
        const velocity = Math.random() * 300 + 100;
        const gravity = 0.5;
        let x = 0;
        let y = 0;
        let vx = Math.cos(angle * Math.PI / 180) * velocity;
        let vy = Math.sin(angle * Math.PI / 180) * velocity;
        
        function animate() {
            x += vx * 0.016;
            y += vy * 0.016;
            vy += gravity;
            
            confetti.style.left = (50 + x) + 'px';
            confetti.style.top = (50 + y) + 'px';
            confetti.style.opacity = 1 - (Math.abs(x) + Math.abs(y)) / 1000;
            
            if (Math.abs(x) < 500 && Math.abs(y) < 500) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Add confetti to CTA button
document.querySelector('.cta-button').addEventListener('click', function() {
    createConfetti();
});
