# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# portfolio

Using React I created an interactive website with edge AI features. The hero of the website shows my face while using a computer vision model for emotion detection which I trained in python (you can find the repo of the emotion detection model here: https://github.com/Shadyabu/emotion-detection). Upon clicking on try it yourself the camera turns on and you can test out the lightweight model yourself, fully run on your local hardware, even running on edge devices like mobile phones. The following section of the website displays personal information about me stylised as taped notes that one can click to uncover. The final section displays a highlight of different AI projects I have completed. Upon clicking on the project card the website displays a project page with a thorough explanation of the project.