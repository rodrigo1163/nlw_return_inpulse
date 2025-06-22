import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "data:image/png;base64,asdf asudfnasdjkfns",
      })
    ).resolves.not.toThrow();

    expect(createFeeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example comment",
        screenshot: "data:image/png;base64,asdf asudfnasdjkfns",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,asdf asudfnasdjkfns",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit feedback without an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "ta tudo bugado",
        screenshot: "12213",
      })
    ).rejects.toThrow();
  });
});
