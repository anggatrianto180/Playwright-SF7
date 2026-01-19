import { Page, expect } from '@playwright/test';

export class AddTrainingEvent {
    private page: Page;

    //Locators
    buttonAdd;
    buttonCreateNewEvent;
    eventType;
    trainingCourse;
    eventName;
    providerType;
    Provider;
    startDate;
    endDate;
    buttonEventDetail;
    Background;
    Objective;
    targetParticipant;
    Remark;
    estimateHours;
    buttonParticipant;
    trainingCapacity;
    employee;
    buttonTransfer;
    tabElearning;
    buttonSetInstructor;
    instructor;
    buttonSubmitInstructor;
    saveAsDraft;
    unpublish;
    publish;
    confirmationSubmit;
    selectContent;
    contentELearning;
    buttonAddSection;
    buttonAddContent;
    validation;
    //Agenda
    buttonAddAgenda;
    buttonAddDay;
    dateAgenda;
    agendaName;
    type;
    startTime;
    endTime;
    buttonSetInstructorAgenda;
    instructorLine3Agenda;
    buttonSubmitInstructorAgenda;

    constructor(page: Page) {
        this.page = page;

        //General Info
        this.buttonAdd = page.getByText('Add')
        this.buttonCreateNewEvent = page.getByText('Create New Event');
        this.eventType = page.locator('div.ant-select-selection-overflow');
        this.trainingCourse = page.locator('#TRNCOURSE_CODE');
        this.eventName = page.getByRole('textbox', { name: 'Event Name' });
        this.providerType = page.getByText('Internal', { exact: true });
        this.Provider = page.locator('#PROVIDER_CODE');
        this.startDate = page.getByPlaceholder('Start date');
        this.endDate = page.getByPlaceholder('End date');
        //Event Details
        this.buttonEventDetail = page.locator('span').filter({ hasText: 'Event Detail' }).first()
        this.Background = page.getByRole('textbox', { name: 'Background' });
        this.Objective = page.getByRole('textbox', { name: 'Objective' });
        this.targetParticipant = page.getByRole('textbox', { name: 'Target Participants' });
        this.Remark = page.getByRole('textbox', { name: 'Remark' });
        this.estimateHours = page.getByPlaceholder('Input Estimate Hours')
        //Agenda
        this.buttonAddAgenda = page.locator('span').filter({ hasText: 'Agenda' }).first();
        this.buttonAddDay = page.getByRole('button', { name: /Add.*Day/i });
        this.dateAgenda = page.getByPlaceholder('Select date');
        this.agendaName = page.getByRole('textbox', { name: 'Input Agenda' });
        this.type = page.locator('#AGENDA_0_ACTIVITY_0_TRNEVENTACTIVITY_TYPE');
        this.startTime = page.locator('#AGENDA_0_ACTIVITY_0_START_TIME');
        this.endTime = page.locator('#AGENDA_0_ACTIVITY_0_END_TIME');
        this.buttonSetInstructorAgenda = page.getByRole('button', { name: 'Set Instructor' });
        this.instructorLine3Agenda = page.locator(`//tr[td[normalize-space()='3']]//input[@type='checkbox']`);
        this.buttonSubmitInstructorAgenda = page.getByRole('button', { name: 'Submit' });
        //Participant
        this.buttonParticipant = page.locator('span').filter({ hasText: 'Participant' }).first()
        this.trainingCapacity = page.getByText('Training Capacity');
        this.employee = page.locator('.ant-checkbox-wrapper').first();
        this.buttonTransfer = page.locator('div.ant-transfer-operation').locator('button').nth(0);
        //E-Learning
        this.tabElearning = page.locator('span').filter({ hasText: 'E-Learning' }).first();
        this.buttonSetInstructor = page.getByRole('button', { name: 'Set Instructor' });
        this.instructor = page.getByRole('checkbox').nth(1);
        this.buttonSubmitInstructor = page.getByRole('button', { name: 'Submit' });
        this.buttonAddSection = page.getByRole('button', { name: 'Add Section' });
        this.contentELearning = page.getByRole('textbox', { name: 'Input section title here' });
        this.buttonAddContent = page.locator('button:has-text("Add Content")');
        this.selectContent = page.locator('.ant-row.cursor-pointer').first();
        //Submit
        this.saveAsDraft = page.getByRole('button', { name: 'Save as Draft' });
        this.unpublish = page.getByRole('button', { name: 'Unpublish' });
        this.publish = page.getByRole('button', { name: 'Publish', exact: true });
        this.confirmationSubmit = page.getByRole('button', { name: 'OK' });
        //Validation
        this.validation = page.locator('.ant-table-row').first();
    }

    async open() {
        await this.page.goto('ent/hrm.training.training-event');
    }

    async clickAdd() {
        await this.buttonAdd.click();
        await this.buttonCreateNewEvent.click();
    }

    async selectEventType() {
        await this.eventType.click();
        await this.eventType.press('Enter');
        await this.eventType.click();
        await this.eventType.click();
        await this.eventType.press('ArrowDown');
        await this.eventType.press('Enter');
        await this.Provider.click();
    }

    async selectTrainingCourse(trainingCourse: string) {
        await this.trainingCourse.click();
        await this.trainingCourse.fill(trainingCourse);
        await this.trainingCourse.press('Enter');
    }

    async inputEventName(eventName: string) {
        await this.eventName.fill(eventName);
    }

    async selectProviderType() {
        await this.providerType.click();

    }

    async selectProvider(provider: string) {
        await this.Provider.click();
        await this.Provider.fill(provider);
        await this.Provider.press('Enter');
    }

    async selectStartDate(startDate: string) {
        await this.startDate.click();
        await this.startDate.fill(startDate);
        await this.page.waitForTimeout(1000);
        await this.startDate.press('Tab');
        await this.page.waitForTimeout(1000);
    }

    async selectEndDate(endDate: string) {
        await this.endDate.click();
        await this.endDate.fill(endDate);
        await this.page.waitForTimeout(1000);
        await this.endDate.press('Tab');
        await this.page.waitForTimeout(1000);
    }

    async fillFormGenerakInfo(
        trainingCourse: string,
        eventName: string,
        provider: string,
        startDate: string,
        endDate: string) {
        await this.selectEventType();
        await this.selectTrainingCourse(trainingCourse);
        await this.inputEventName(eventName);
        await this.selectProviderType();
        await this.selectProvider(provider);
        await this.selectStartDate(startDate);
        await this.selectEndDate(endDate);
    }

    //Agenda
    async clickAddAgenda() {
        await this.buttonAddAgenda.dblclick();
    }

    async clickAddDay() {
        await this.buttonAddDay.click();
    }

    async selectDateAgenda(date: string) {
        await this.dateAgenda.click();
        await this.dateAgenda.fill(date);
        await this.dateAgenda.press('Enter');
    }

    async inputTitleAgenda(title: string) {
        await this.agendaName.fill(title);
    }

    async selectTypeAgenda() {
        await this.type.click();
        await this.type.press('Enter');
    }

    async inputStartTimeAgenda(starttime: string) {
        await this.startTime.fill(starttime);
    }

    async inputEndTimeAgenda(endtime: string) {
        await this.endTime.fill(endtime);
    }

    async clickSetInstructorAgenda() {
        await this.buttonSetInstructorAgenda.click();
    }

    async selectInstructorLine3Agenda() {
        await this.instructorLine3Agenda.click();
    }

    async clickSubmitInstructorAgenda() {
        await this.buttonSubmitInstructorAgenda.click();
    }

    async fillAgenda(
        date: string,
        title: string,
        starttime: string,
        endtime: string) {
        await this.clickAddAgenda();
        await this.clickAddDay();
        await this.selectDateAgenda(date);
        await this.inputTitleAgenda(title);
        await this.selectTypeAgenda();
        await this.inputStartTimeAgenda(starttime);
        await this.inputEndTimeAgenda(endtime);
    }

    //Event Detail
    async clickTabEventDetail() {
        await this.buttonEventDetail.click();
        await this.buttonEventDetail.click();
    }

    async fillBackground(background: string) {
        await this.Background.fill(background);
    }

    async fillObjective(objective: string) {
        await this.Objective.fill(objective);
    }

    async fillTargetParticipant(targetParticipant: string) {
        await this.targetParticipant.fill(targetParticipant);
    }

    async fillRemark(remark: string) {
        await this.Remark.fill(remark);
    }

    async fillEstimateHours(estimateHours: string) {
        await this.estimateHours.click();
        await this.estimateHours.fill(estimateHours);
    }

    async fillFormEventDetail(
        background: string,
        objective: string,
        targetParticipant: string,
        remark: string,
        estimateHours: string) {
        await this.clickTabEventDetail();
        await this.fillBackground(background);
        await this.fillObjective(objective);
        await this.fillTargetParticipant(targetParticipant);
        await this.fillRemark(remark);
        await this.fillEstimateHours(estimateHours);
    }

    async clickTabParticipant() {
        await this.buttonParticipant.dblclick();
    }

    async fillTrainingCapacity(trainingCapacity: string) {
        await this.trainingCapacity.click();
        await this.trainingCapacity.fill(trainingCapacity);
    }

    async selectEmployee() {
        await this.employee.click();
        await this.buttonTransfer.click();

    }

    async fillFormParticipant(
        trainingCapacity: string
    ) {
        await this.clickTabParticipant();
        await this.fillTrainingCapacity(trainingCapacity);
        await this.selectEmployee();
    }

    async clickTabElearning() {
        await this.tabElearning.dblclick();
    }

    async setInstructor() {
        await this.buttonSetInstructor.click();
        await this.instructor.click();
        await this.buttonSubmitInstructor.click();
    }

    async addContent(contentName: string) {
        await this.buttonAddSection.click();
        await this.contentELearning.fill(contentName);
        await this.buttonAddContent.dblclick();
        await this.page.waitForTimeout(500);
        await this.selectContent.click();
        await this.page.waitForTimeout(500);
    }

    async fillFormElearning(contentName: string) {
        await this.clickTabElearning();
        await this.setInstructor();
        await this.addContent(contentName);
    }

    async clickSaveAsDraft() {
        await this.saveAsDraft.click();
        await this.confirmationSubmit.click();
    }
    async clickUnpublish() {
        await this.unpublish.click();
        await this.confirmationSubmit.click();
    }
    async clickPublish() {
        await this.publish.click();
        await this.confirmationSubmit.click();
    }

    async changeToTable(trainingEvent: string) {
        await this.page.locator("label[class='ant-radio-button-wrapper']").click();
        await this.page.getByRole('textbox', { name: 'Training Event' }).fill(trainingEvent);
        await this.page.getByRole('textbox', { name: 'Training Event' }).press('Enter');
    }
}