# AI Development Workflow Comparison

## Round One: Vague Prompt

In the first round, I used a simple prompt:
"Build a settings form."

The AI generated a working settings form, but the prompt did not provide any project context, requirements, validation rules, accessibility expectations, or testing instructions.

The implementation worked, but it required more manual review. Important areas such as validation behavior, accessibility, and code structure were not clearly defined. The developer needed to inspect the generated code and identify missing improvements.

## Round Two: Precise Prompt

In the second round, I used a structured prompt with project exploration, planning, requirements, constraints, and verification steps.

The AI first analyzed the repository and created an implementation plan before writing code. The generated solution included form validation, accessible labels, error handling, responsive styling, and verification tests.

The second approach produced more reliable code because the AI understood the expected behavior before implementation.

## Comparison

The main difference was not only the final code but also the review effort.

Round One required more checking because the AI had to make assumptions about the feature.

Round Two required more planning at the beginning but reduced debugging time because the requirements were clear.

The second implementation had:
- Better validation handling
- Improved accessibility
- Clearer error messages
- Better code organization
- Verification steps after implementation

## AI Mistake Found

During verification, the AI-generated project had an issue with port 3000 already being occupied on my machine. The AI identified the problem and suggested using another port or stopping the existing process.

## Conclusion

This comparison shows that effective AI development requires clear specifications, constraints, and verification. A good prompt reduces uncertainty and makes AI-generated code easier to review and maintain.