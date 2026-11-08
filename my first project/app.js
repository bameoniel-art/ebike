const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
	mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Open navigation");
		mainNav.classList.remove("is-open");
	}
});

const checklist = document.querySelector(".checklist");
const checkboxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
const progressCount = document.querySelector("#progress-count");
const progressFill = document.querySelector("#progress-fill");
const progressMessage = document.querySelector("#progress-message");

function updateProgress() {
	const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
	progressCount.textContent = `${completed} / ${checkboxes.length}`;
	progressFill.style.width = `${(completed / checkboxes.length) * 100}%`;
	progressMessage.textContent = completed === checkboxes.length
		? "Checklist complete. Keep making these checks part of your routine."
		: completed === 0
			? "Four small checks can reinforce a safer routine."
			: `${checkboxes.length - completed} ${checkboxes.length - completed === 1 ? "check" : "checks"} left to review.`;
}

checkboxes.forEach((checkbox) => checkbox.addEventListener("change", updateProgress));

checklist.querySelector(".reset-checklist").addEventListener("click", () => {
	checkboxes.forEach((checkbox) => { checkbox.checked = false; });
	updateProgress();
	checkboxes[0].focus();
});
