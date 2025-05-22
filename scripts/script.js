async function fetchLeetCodeStats(username) {
  const query = {
    query: `
      {
        matchedUser(username: "${username}") {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `,
  };

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    const data = await res.json();
    return data.data.matchedUser.submitStats.acSubmissionNum;
  } catch (err) {
    console.error("Failed to fetch LeetCode data:", err);
    return [];
  }
}

function renderLeetCodeChart(stats) {
  const easy = stats.find((x) => x.difficulty === "Easy");
  const medium = stats.find((x) => x.difficulty === "Medium");
  const hard = stats.find((x) => x.difficulty === "Hard");

  const totalSolved = easy.count + medium.count + hard.count;

  // Update difficulty text
  document.getElementById("easy-count").textContent = `${easy.count}/${easy.submissions}`;
  document.getElementById("medium-count").textContent = `${medium.count}/${medium.submissions}`;
  document.getElementById("hard-count").textContent = `${hard.count}/${hard.submissions}`;

  // Create chart
  const ctx = document.getElementById("leetcodeChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [{
        data: [easy.count, medium.count, hard.count],
        backgroundColor: ["#00c2c2", "#ffb100", "#ff4d4f"],
        borderWidth: 2,
      }],
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      }
    }
  });
}

// Initialize chart after DOM loads
window.addEventListener('DOMContentLoaded', async () => {
  const stats = await fetchLeetCodeStats("ananyapawar601");
  renderLeetCodeChart(stats);
});
