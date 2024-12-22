document.addEventListener("DOMContentLoaded", function () {
	var calendarEl = document.getElementById("listView");

	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: "prev,next today",
			center: "title",
			right: "listDay,listWeek",
		},

		// customize the button names,
		// otherwise they'd all just say "list"
		views: {
			listDay: { buttonText: "list day" },
			listWeek: { buttonText: "list week" },
		},

		initialView: "listWeek",
		initialDate: "2022-10-12",
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		dayMaxEvents: true, // allow "more" link when too many events
		events: [
			{
				title: "All Day Event",
				start: "2022-10-01",
				color: "#21538d"
			},
			{
				title: "Long Event",
				start: "2022-10-07",
				end: "2022-10-10",
				color: "#0c0d0d",
			},
			{
				groupId: 999,
				title: "Repeating Event",
				start: "2022-10-09T16:00:00",
				color: "#3b5d4f",
			},
			{
				groupId: 999,
				title: "Repeating Event",
				start: "2022-10-16T16:00:00",
				color: "#dfa71c",
			},
			{
				title: "Conference",
				start: "2022-10-11",
				end: "2022-10-13",
				color: "#4f6d61"
			},
			{
				title: "Meeting",
				start: "2022-10-12T10:30:00",
				end: "2022-10-12T12:30:00",
				color: "#899e95",
			},
			{
				title: "Lunch",
				start: "2022-10-12T12:00:00",
				color: "#9daea7",
			},
			{
				title: "Meeting",
				start: "2022-10-12T14:30:00",
			},
			{
				title: "Happy Hour",
				start: "2022-10-12T17:30:00",
				color: "#e13d4b",
			},
			{
				title: "Dinner",
				start: "2022-10-12T20:00:00",
				color: "#355447"
			},
			{
				title: "Birthday Party",
				start: "2022-10-13T07:00:00",
				color: "#b1beb9",
			},
			{
				title: "Click for Google",
				url: "http://google.com/",
				start: "2022-10-28",
				color: "#627d72"
			},
		],
	});

	calendar.render();
});
