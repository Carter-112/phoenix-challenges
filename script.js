"use client";
import React from "react";

function triggerAdLink() {
  // Simulate the ad link click
  let adLink = document.createElement("a");
  adLink.href = "https://phoenix.created.app/"; // Placeholder URL that does nothing
  adLink.target = "_self"; // Ensures no new page opens or anything loads
  adLink.style.display = "none"; // Hide the link from view
  document.body.appendChild(adLink); // Add the link to the document
  adLink.click(); // Simulate the click to trigger the ad
  adLink.remove(); // Clean up by removing the link

  // Redirect to your desired page after the ad click
  window.location.href = "https://phoenix.created.app"; // Your website URL
}
function MainComponent() {
  const [challenges, setChallenges] = React.useState(() => {
    const savedChallenges = localStorage.getItem("challenges");
    return savedChallenges ? JSON.parse(savedChallenges) : [];
  });
  const [completedChallenges, setCompletedChallenges] = React.useState(() => {
    const savedCompleted = localStorage.getItem("completedChallenges");
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [streak, setStreak] = React.useState(
    () => parseInt(localStorage.getItem("streak")) || 0
  );
  const [difficulty, setDifficulty] = React.useState(
    () => localStorage.getItem("difficulty") || "normal"
  );
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [canChangeDifficulty, setCanChangeDifficulty] = React.useState(true);
  const [canReviveStreak, setCanReviveStreak] = React.useState(false);
  const [settingsClickCount, setSettingsClickCount] = React.useState(0);
  const [developerMode, setDeveloperMode] = React.useState(false);
  const [nightMode, setNightMode] = React.useState(() => {
    const savedNightMode = localStorage.getItem("nightMode");
    return savedNightMode ? JSON.parse(savedNightMode) : false;
  });
  const [devModeTimer, setDevModeTimer] = React.useState(null);
  const [lastSettingsClickTime, setLastSettingsClickTime] = React.useState(0);
  const [previousStreak, setPreviousStreak] = React.useState(0);
  const [lastCompletedDifficulty, setLastCompletedDifficulty] = React.useState(
    () => localStorage.getItem("lastCompletedDifficulty") || "normal"
  );
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    document.title = "Phoenix - Daily Challenges";
    if (challenges.length === 0) {
      generateNewChallenges();
    }
    checkStreak();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  React.useEffect(() => {
    localStorage.setItem(
      "completedChallenges",
      JSON.stringify(completedChallenges)
    );
  }, [completedChallenges]);

  React.useEffect(() => {
    localStorage.setItem("streak", streak.toString());
  }, [streak]);

  React.useEffect(() => {
    localStorage.setItem("difficulty", difficulty);
  }, [difficulty]);

  React.useEffect(() => {
    setCanChangeDifficulty(completedChallenges.length === 0);
  }, [completedChallenges]);

  const easyChallengeList = [
    "Do 10 push-ups",
    "Meditate for 5 minutes",
    "Write a short gratitude list",
    "Take a 10-minute walk",
    "Drink 8 glasses of water today",
    "Read 10 pages of a book",
    "Do 20 jumping jacks",
    "Write a kind message to a friend",
    "Stretch for 5 minutes",
    "Learn 3 new words in a foreign language",
    "Take 3 deep breaths",
    "Tidy up one small area in your home",
    "Listen to a new song",
    "Do a 5-minute plank",
    "Write down 3 goals for the week",
    "Try a new healthy recipe",
    "Do 15 squats",
    "Compliment someone",
    "Take a power nap",
    "Draw a simple sketch",
    "Practice good posture for 10 minutes",
    "Learn a new joke",
    "Do 10 minutes of yoga",
    "Write a haiku",
    "Take a cold shower for 30 seconds",
    "Do 25 sit-ups",
    "Learn to say 'thank you' in 3 languages",
    "Declutter your desk",
    "Take a photo of something beautiful",
    "Do 10 lunges on each leg",
    "Write down 3 things you're grateful for",
    "Try a new fruit or vegetable",
    "Do 30 seconds of jump rope",
    "Learn a magic trick",
    "Meditate for 10 minutes",
    "Do 20 arm circles",
    "Write a short story in 6 words",
    "Take a 15-minute nature walk",
    "Do 10 burpees",
    "Learn to count to 10 in a new language",
    "Do a 1-minute wall sit",
    "Write a positive affirmation",
    "Try a new tea or coffee",
    "Do 20 mountain climbers",
    "Practice mindful eating for one meal",
    "Learn 5 capitals of countries",
    "Do 10 tricep dips",
    "Write a letter to your future self",
    "Take 5 minutes to practice deep breathing",
    "Do 15 calf raises",
    "Learn a new constellation",
    "Try a 5-minute meditation",
    "Do 20 high knees",
    "Write down a new idea",
    "Take a technology break for 30 minutes",
    "Do 10 shoulder shrugs",
    "Learn a new stretching exercise",
    "Write a short poem",
    "Do 15 bicycle crunches",
    "Try a new healthy snack",
    "Learn to tie a new knot",
    "Do 10 leg raises",
    "Write down a personal strength",
    "Take a 5-minute dance break",
    "Do 20 Russian twists",
    "Learn a new origami shape",
    "Try oil pulling for 5 minutes",
    "Do 15 push-up holds",
    "Write a thank-you note",
    "Take a 10-minute power nap",
    "Do 20 bodyweight squats",
    "Learn 3 new facts about space",
    "Try a new breathing technique",
    "Do 10 superman holds",
    "Write down a childhood memory",
    "Take a 5-minute break to look at nature",
    "Do 15 glute bridges",
    "Learn to say a tongue twister",
    "Try a new way to prepare your coffee or tea",
    "Do 20 jumping lunges",
    "Write down a quote that inspires you",
    "Take a 10-minute break to listen to calming music",
    "Do 15 pike push-ups",
    "Learn 3 new words in sign language",
    "Try a new way to style your hair",
    "Do 20 flutter kicks",
    "Write down a small act of kindness you can do today",
    "Take a 5-minute break to practice gratitude",
    "Do 10 wall push-ups",
    "Learn a new card trick",
    "Try a new way to relax for 10 minutes",
    "Do 15 reverse crunches",
    "Write down a new habit you want to develop",
    "Take a 10-minute break to declutter your phone",
    "Do 20 lateral leg raises",
    "Learn how to say 'peace' in 5 languages",
    "Try a new 5-minute face massage technique",
    "Do 10 cat-cow stretches",
    "Write down a fear you want to overcome",
    "Take a 5-minute break to practice positive self-talk",
    "Do 15 arm scissors",
    "Learn a new way to tie your shoes",
    "Try a new 10-minute meditation technique",
  ];
  const normalChallengeList = [
    "Run 5 kilometers",
    "Do 50 push-ups throughout the day",
    "Meditate for 15 minutes",
    "Write a 1000-word short story",
    "Learn and perform a simple magic trick",
    "Do 50 burpees throughout the day",
    "Read 50 pages of a book",
    "Fast for 12 hours (including sleep time)",
    "Learn to juggle with 3 balls for 1 minute",
    "Do 20 pull-ups throughout the day",
    "Write and practice a 2-minute comedy routine",
    "Complete a 500-piece puzzle",
    "Learn to solve a 3x3 Rubik's cube",
    "Hold a plank for 3 minutes (can be split)",
    "Learn to play a simple song on an instrument",
    "Bike for 10 miles",
    "Write 10 handwritten letters to friends or family",
    "Do 500 jump ropes",
    "Learn to say 'hello' in 10 different languages",
    "Take a 2-minute cold shower",
    "Do 100 squats throughout the day",
    "Create a simple personal website",
    "Learn and perform a 1-minute dance routine",
    "Complete a 500-calorie workout",
    "Write a 3-page essay on a topic you're unfamiliar with",
    "Do a 6-hour technology detox",
    "Practice writing with your non-dominant hand for 15 minutes",
    "Write a 500-word gratitude journal entry",
    "Do 30 minutes of high-intensity interval training",
    "Cook a new recipe from scratch",
    "Avoid added sugar for 12 hours",
    "Do 200 crunches throughout the day",
    "Practice typing for 30 minutes to improve speed",
    "Meditate for 30 minutes (can be split)",
    "Do a workout with 50 push-ups, 50 squats, and 50 sit-ups",
    "Learn to fold 10 different origami shapes",
    "Write and publish a short blog post",
    "Walk 10 miles throughout the day",
    "Solve a challenging crossword puzzle",
    "Say 'yes' to every request for 6 hours (within reason)",
    "Declutter one room in your living space",
    "Memorize and recite a 2-minute monologue",
    "Do 200 kettlebell swings throughout the day",
    "Write a 2000-word short story",
    "Eat only unprocessed foods for a day",
    "Learn to identify 20 different bird species",
    "Do 50 box jumps",
    "Perform 12 random acts of kindness",
    "Learn to solve a Sudoku puzzle",
    "Do a 1-hour workout",
    "Write lyrics for an original song",
    "Complete a 500-word stream of consciousness writing",
    "Draw a self-portrait",
    "Do 10 handstand push-ups (wall-assisted if needed)",
    "Donate or recycle 20 items you no longer need",
    "Memorize the first 20 elements of the periodic table",
    "Study a new subject for 3 hours",
    "Write a letter to your future self",
    "Take 50 unique photographs",
    "Learn to solve a 2x2 Rubik's cube",
    "Do 200 lunges throughout the day",
    "Practice mindfulness for 2 hours",
    "Learn to identify 10 constellations",
    "Read 100 pages in a day",
    "Write a 25-item bucket list",
    "Do a 1-hour yoga session",
    "Learn basic calligraphy",
    "Do 20 one-arm push-ups (10 per arm)",
    "Try a new diet for a day (e.g., vegan, keto)",
    "Solve 5 riddles or brain teasers",
    "Meditate for 1 hour (can be split)",
    "Write a 1000-word personal essay",
    "Wake up at 5 AM and be productive for 12 hours",
    "Learn to identify 20 different types of clouds",
    "Do 200 box jumps throughout the day",
    "Practice silence for 6 hours",
    "Learn the basic rules of chess and play a game",
    "Do 1 hour of continuous stretching",
    "Write a 10-page autobiography",
    "Avoid all added sugar for a day",
    "Learn to identify 30 different plant species",
    "Do 30 muscle-ups throughout the day",
    "Complete a 16-hour fast (including sleep time)",
    "Memorize and recite a famous 5-minute speech",
    "Take 5 cold showers throughout the day",
    "Write a script for a short film",
    "Avoid alcohol for 24 hours",
    "Learn to play 3 songs on a musical instrument",
    "Do 200 pistol squats throughout the day (100 per leg)",
    "Limit electronic device use to 2 hours",
    "Give a 10-minute presentation on a topic with 5 minutes prep",
    "Exercise for 3 hours (can be split)",
    "Write a collection of 10 poems",
    "Complete a 12-hour body transformation challenge",
    "Learn to create an intermediate origami model",
    "Do 1,000 push-ups in a day",
    "Write a 3,000-word journal entry",
    "Learn to solve a 4x4 Rubik's cube",
    "Run a half-marathon (13.1 miles)",
    "Write an outline for an academic paper",
    "Take 300 photographs in a day",
  ];

  const hardChallengeList = normalChallengeList;
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    const currentTime = Date.now();
    if (currentTime - lastSettingsClickTime < 500) {
      setSettingsClickCount((prev) => prev + 1);
      if (settingsClickCount >= 4) {
        setDeveloperMode(true);
        setToast("Developer mode activated!");
        setTimeout(() => setToast(null), 3000);
      }
    } else {
      setSettingsClickCount(0);
    }
    setLastSettingsClickTime(currentTime);
  };
  const generateNewChallenges = (newDifficulty = difficulty) => {
    let challengeList;
    let numChallenges;

    switch (newDifficulty) {
      case "easy":
        challengeList = easyChallengeList;
        numChallenges = Math.floor(Math.random() * 3) + 1; // 1 to 3 challenges
        break;
      case "normal":
        challengeList = normalChallengeList;
        numChallenges = Math.floor(Math.random() * 3) + 3; // 3 to 5 challenges
        break;
      case "hard":
        challengeList = hardChallengeList;
        numChallenges = Math.floor(Math.random() * 3) + 5; // 5 to 7 challenges
        break;
      default:
        challengeList = normalChallengeList;
        numChallenges = Math.floor(Math.random() * 3) + 3;
    }

    const shuffled = [...challengeList].sort(() => 0.5 - Math.random());
    setChallenges(shuffled.slice(0, numChallenges));
    setCompletedChallenges([]);
    setCanChangeDifficulty(true);
    setDifficulty(newDifficulty);
  };
  const simulateDayPassing = () => {
    if (developerMode) {
      if (completedChallenges.length !== challenges.length) {
        setPreviousStreak(streak);
        setStreak(0);
        setCanReviveStreak(true);
      }
      generateNewChallenges();
      localStorage.setItem("lastChecked", new Date().toDateString());
    }
  };
  const toggleChallenge = (index) => {
    if (!completedChallenges.includes(index)) {
      if (window.confirm("Are you sure you've completed this challenge?")) {
        setCompletedChallenges((prev) => {
          const newCompleted = [...prev, index];
          if (newCompleted.length === challenges.length) {
            updateStreak();
          }
          return newCompleted;
        });
      }
    }
  };
  const checkStreak = () => {
    const today = new Date().toDateString();
    const lastChecked = localStorage.getItem("lastChecked");

    if (lastChecked !== today) {
      if (completedChallenges.length !== challenges.length) {
        setPreviousStreak(streak);
        setStreak(0);
        setCanReviveStreak(true);
      } else {
        updateStreak();
      }
      generateNewChallenges();
      localStorage.setItem("lastChecked", today);
    }
  };
  const resetChallenge = (index) => {
    if (developerMode) {
      setCompletedChallenges((prev) => prev.filter((i) => i !== index));
      setCanReviveStreak(false);
    }
  };
  const updateStreak = () => {
    setStreak((prev) => {
      const newStreak = prev + 1;
      localStorage.setItem("streak", newStreak.toString());
      return newStreak;
    });
    setCanReviveStreak(false);
    setLastCompletedDifficulty(difficulty);
    localStorage.setItem("lastCompletedDifficulty", difficulty);
    localStorage.setItem("lastChecked", new Date().toDateString());
  };
  const handleDifficultyChange = (newDifficulty) => {
    if (canChangeDifficulty) {
      if (newDifficulty === difficulty) {
        alert("You are already at this difficulty level.");
      } else {
        const confirmChange = window.confirm(
          `Changing difficulty will reset your streak to 0. Are you sure you want to change to ${newDifficulty} difficulty?`
        );
        if (confirmChange) {
          setStreak(0);
          generateNewChallenges(newDifficulty);
        }
      }
    } else {
      alert("You can't change the difficulty until tomorrow.");
    }
  };
  const resetEverything = () => {
    if (
      window.confirm(
        "Are you sure you want to reset everything? This action cannot be undone."
      )
    ) {
      localStorage.clear();
      setStreak(0);
      setPreviousStreak(0);
      setCompletedChallenges([]);
      setCanChangeDifficulty(true);
      setCanReviveStreak(false);
      setLastCompletedDifficulty("normal");
      generateNewChallenges("normal");
      alert("Everything has been reset to default settings.");
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        nightMode ? "from-gray-800 to-gray-900" : "from-orange-400 to-blue-600"
      } p-6 font-roboto text-white relative overflow-hidden`}
    >
      <div className="swirling-stripe"></div>
      <h1 className="text-4xl font-bold mb-8 text-center relative z-10">
        Daily Challenges
      </h1>
      <div
        className={`${
          nightMode ? "bg-gray-700" : "bg-white"
        } bg-opacity-80 rounded-lg shadow-lg p-6 mb-8 relative z-10`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            nightMode ? "text-white" : "text-gray-800"
          }`}
        >
          Today's Challenges
        </h2>
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className={`flex items-center justify-between mb-4 p-2 ${
              nightMode ? "bg-gray-600" : "bg-gray-100"
            } rounded`}
          >
            <span
              className={`${
                nightMode ? "text-white" : "text-gray-700"
              } flex-grow`}
            >
              {challenge}
            </span>
            {completedChallenges.includes(index) ? (
              <span className="text-green-500 text-3xl">✓</span>
            ) : (
              <button
                onClick={() => toggleChallenge(index)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Complete
              </button>
            )}
            {developerMode && (
              <button
                onClick={() => resetChallenge(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ml-2"
              >
                Reset
              </button>
            )}
          </div>
        ))}
      </div>

      <div
        className={`${
          nightMode ? "bg-gray-700" : "bg-white"
        } bg-opacity-80 rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            nightMode ? "text-white" : "text-gray-800"
          }`}
        >
          Your Streak
        </h2>
        <p
          className={`text-3xl font-bold text-center ${
            nightMode ? "text-white" : "text-gray-800"
          }`}
        >
          {streak} days
        </p>
      </div>

      {canReviveStreak && (
        <div
          className={`${
            nightMode ? "bg-gray-700" : "bg-white"
          } bg-opacity-80 rounded-lg shadow-lg p-6 mb-8`}
        >
          <h2
            className={`text-2xl font-semibold mb-4 ${
              nightMode ? "text-white" : "text-gray-800"
            }`}
          >
            Revive Streak
          </h2>
          <p className={`mb-4 ${nightMode ? "text-white" : "text-gray-800"}`}>
            You lost your streak of {previousStreak} days. Would you like to
            revive it?
          </p>
          <button
            onClick={() => {
              setStreak(previousStreak);
              setCanReviveStreak(false);
              triggerAdLink(); // Trigger the ad link when the button is clicked
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Revive Streak
          </button>
        </div>
      )}

      <button
        onClick={toggleSettings}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mb-8"
      >
        <i className="fas fa-cog mr-2"></i>
        Settings
      </button>

      {isSettingsOpen && (
        <div
          className={`${
            nightMode ? "bg-gray-700" : "bg-white"
          } bg-opacity-80 rounded-lg shadow-lg p-6 mb-8 relative z-10`}
        >
          <h2
            className={`text-2xl font-semibold mb-4 ${
              nightMode ? "text-white" : "text-gray-800"
            }`}
          >
            Settings
          </h2>
          <div className="mb-4">
            <label
              className={`block ${
                nightMode ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Difficulty:
            </label>
            <div className="flex justify-between">
              <button
                onClick={() => handleDifficultyChange("easy")}
                className={`px-4 py-2 rounded ${
                  difficulty === "easy"
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-200 text-yellow-800"
                } ${!canChangeDifficulty && "opacity-50 cursor-not-allowed"}`}
                disabled={!canChangeDifficulty}
              >
                Easy
              </button>
              <button
                onClick={() => handleDifficultyChange("normal")}
                className={`px-4 py-2 rounded ${
                  difficulty === "normal"
                    ? "bg-green-500 text-white"
                    : "bg-green-200 text-green-800"
                } ${!canChangeDifficulty && "opacity-50 cursor-not-allowed"}`}
                disabled={!canChangeDifficulty}
              >
                Normal
              </button>
              <button
                onClick={() => handleDifficultyChange("hard")}
                className={`px-4 py-2 rounded ${
                  difficulty === "hard"
                    ? "bg-red-500 text-white"
                    : "bg-red-200 text-red-800"
                } ${!canChangeDifficulty && "opacity-50 cursor-not-allowed"}`}
                disabled={!canChangeDifficulty}
              >
                Hard
              </button>
            </div>
          </div>
          {!canChangeDifficulty && (
            <p className="text-red-500 mb-4">
              You can't change the difficulty until tomorrow.
            </p>
          )}
          <div className="mb-4">
            <label
              className={`block ${
                nightMode ? "text-white" : "text-gray-700"
              } mb-2`}
            >
              Night Mode:
            </label>
            <button
              onClick={() => setNightMode(!nightMode)}
              className={`px-4 py-2 rounded ${
                nightMode
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {nightMode ? "Disable" : "Enable"} Night Mode
            </button>
          </div>
          <button
            onClick={resetEverything}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Reset Everything
          </button>
          {developerMode && (
            <div className="mt-4">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  nightMode ? "text-white" : "text-gray-800"
                }`}
              >
                Developer Controls
              </h3>
              <div className="flex items-center mb-2">
                <label
                  className={`mr-2 ${
                    nightMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Set Streak:
                </label>
                <input
                  type="number"
                  value={streak}
                  onChange={(e) => setStreak(parseInt(e.target.value))}
                  className="border rounded px-2 py-1 text-gray-800"
                />
              </div>
              <button
                onClick={simulateDayPassing}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-2"
              >
                Simulate Day Passing
              </button>
            </div>
          )}
        </div>
      )}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}
      <style jsx global>{`
        .swirling-stripe {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(45deg, #ff8c00, #0080ff);
          transform: translateX(-50%);
          opacity: 0.5;
          z-index: 0;
          animation: swirl 20s infinite linear;
          clip-path: path('M0,100 Q50,0 100,100 T200,100 T300,100 T400,100 T500,100 V100 H0');
        }
        @keyframes swirl {
          0% {
            transform: translateX(-50%) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) rotate(360deg);
          }
        }
      `}</style>
      <a
        href="https://www.appcreator24.com/afi/1988182"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-white hover:text-gray-300 text-center block mt-4"
      >
        Click here to make an app of your own!
      </a>
    </div>
  );
}

export default MainComponent;
