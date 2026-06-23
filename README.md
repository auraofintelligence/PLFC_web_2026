<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Pu5DCXLar1so_KRR4nHMw6UJEIo0qCSj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment on GitHub Pages

This project is configured for deployment using GitHub Actions.

**⚠️ Security Warning:** This application uses the Gemini API directly from the client (browser). Deploying this as a static site (like GitHub Pages) will expose your `GEMINI_API_KEY` in the bundled JavaScript code. Anyone who visits your site can inspect the code and see your API key. It is recommended to restrict your API key to specific domains in the Google Cloud Console, or use a backend proxy for production apps.

### How to deploy:

1.  Push this code to a GitHub repository.
2.  Go to your repository **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  Name: `GEMINI_API_KEY`
5.  Value: Paste your Gemini API key.
6.  Go to **Settings** > **Pages**.
7.  Under **Build and deployment**, select **GitHub Actions** as the source.
8.  The deployment workflow will run automatically on push to the `main` or `master` branch.
