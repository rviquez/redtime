<template>
  <v-row class="fill-height">
    <v-btn
      @click.stop="dialog = true"
      color="accent"
      fab
      dark
      small
      fixed
      right
      bottom
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="primary">
          <v-btn text class="mr-4" @click="setToday">
            <v-icon small>mdi-calendar-today</v-icon>
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <span><v-icon right>mdi-calendar-multiple</v-icon></span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form ref="addForm" @submit.prevent="addEvent">
              <v-text-field
                v-model="start"
                type="date"
                label="start (required)"
              ></v-text-field>
              <v-text-field
                v-model="color"
                type="color"
                label="color (click to open color menu)"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                class="mr-4"
                @click.stop="dialog = false"
              >
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card color="grey" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                <v-text-field
                  v-model="selectedEvent.start"
                  type="date"
                  label="start (required)"
                ></v-text-field>
                <v-text-field
                  v-model="selectedEvent.color"
                  type="color"
                  label="color (click to open color menu)"
                ></v-text-field>
              </form>
              <form v-else>
                <textarea-autosize
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="add note"
                >
                </textarea-autosize>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                close
              </v-btn>
              <v-btn
                v-if="currentlyEditing !== selectedEvent.id"
                text
                color="secondary"
                @click.prevent="editEvent(selectedEvent)"
              >
                edit
              </v-btn>
              <v-btn
                text
                v-else
                type="submit"
                @click.prevent="updateEvent(selectedEvent)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { db } from "@/main";
export default {
  data: () => ({
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    name: "Period",
    start: null,
    end: null,
    color: "secondary", // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false
  }),
  mounted() {
    this.getEvents();
  },
  computed: {
    today: new Date().toISOString().substr(0, 10),
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "short"
      });
    },
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    async getEvents() {
      let snapshot = await db
        .collection("calEvent")
        .where("user", "==", this.user.data.email)
        .get();
      const events = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      this.events = events;
    },
    setDialogDate({ date }) {
      this.dialogDate = true;
      this.focus = date;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = new Date().toISOString().substr(0, 10);
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    async addEvent() {
      console.log(this.start);
      console.log(this.name);
      if (this.start && this.start.date === undefined) {
        await db.collection("calEvent").add({
          user: this.user.data.email,
          name: this.name ? this.name : "Period",
          start: this.start,
          end: this.setEndTime(),
          color: this.color ? this.color : "secondary"
        });
        this.getEvents();
        (this.name = ""),
          (this.details = ""),
          (this.start = ""),
          (this.end = ""),
          (this.color = "");
      } else {
        this.setSnack(
          "Event not saved. You must enter start time and a color."
        );
      }
    },
    setEndTime() {
      var newDate = new Date(this.start);
      newDate.setDate(newDate.getDate() + 4);
      var endDate = new Date(newDate).toJSON().slice(0, 10);
      return endDate;
    },
    editEvent(ev) {
      this.currentlyEditing = ev.id;
    },
    async updateEvent(ev) {
      await db
        .collection("calEvent")
        .doc(this.currentlyEditing)
        .update({
          details: ev.details
        });
      this.selectedOpen = false;
      this.currentlyEditing = null;
      this.getEvents();
    },
    async deleteEvent(ev) {
      await db
        .collection("calEvent")
        .doc(ev)
        .delete();
      this.selectedOpen = false;
      this.getEvents();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    })
  }
};
</script>
