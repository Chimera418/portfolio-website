import { c as createComponent } from './astro-component_B5SO9A1K.mjs';
import 'piccolore';
import { r as maybeRenderHead, C as unescapeHTML, x as renderTemplate } from './entrypoint_iyr8SyaV.mjs';
import 'clsx';

const html$9 = () => "<h2 id=\"the-problem\">The Problem</h2>\n<p>Managing and distributing certificates for large hackathons and events is a logistical nightmare. Organizers typically have to manually generate PDFs, cross-reference attendee lists, and send hundreds of individual emails.</p>\n<h2 id=\"the-solution\">The Solution</h2>\n<p>A streamlined, full-stack <strong>Flask</strong> application designed to automate the entire lifecycle of event certificate generation and distribution.</p>\n<h3 id=\"technical-implementation\">Technical Implementation</h3>\n<ul>\n<li><strong>Data Validation</strong>: Securely parses and validates participant data (from CSVs or databases).</li>\n<li><strong>Dynamic Rendering</strong>: Utilizes the <strong>Pillow (PIL)</strong> library to programmatically overlay participant names, event details, and unique IDs onto beautiful template images on the server-side.</li>\n<li><strong>Bulk Email Distribution</strong>: Integrates SMTP logic to automatically dispatch customized, rendered certificates to hundreds of participants simultaneously without triggering spam filters.</li>\n<li><strong>Web Dashboard</strong>: A clean HTML/CSS interface allowing organizers to upload templates, manage lists, and trigger the generation process with a single click.</li>\n</ul>\n<h2 id=\"real-world-impact\">Real-World Impact</h2>\n<p>Built primarily for CSI (Computer Society of India) events at my university, this tool reduced a multi-day administrative chore into a 5-minute automated workflow.</p>";

				const frontmatter$9 = {"title":"Certificate Generator","description":"A Flask application for event-based certificate distribution. Features participant validation, server-side Pillow rendering, and bulk email delivery.","tags":["Flask","Python","Pillow","HTML/CSS"],"link":"https://csi-certificate-generator-odhy.onrender.com","github":"https://github.com/Chimera418/Certificate-Generator","order":5};
				const file$9 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/certificate-generator.md";
				const url$9 = undefined;
				function rawContent$9() {
					return "   \n                              \n                                                                                                                                                                    \n                                               \n                                                           \n                                                             \n        \n   \n\n## The Problem\n\nManaging and distributing certificates for large hackathons and events is a logistical nightmare. Organizers typically have to manually generate PDFs, cross-reference attendee lists, and send hundreds of individual emails.\n\n## The Solution\n\nA streamlined, full-stack **Flask** application designed to automate the entire lifecycle of event certificate generation and distribution.\n\n### Technical Implementation\n\n- **Data Validation**: Securely parses and validates participant data (from CSVs or databases).\n- **Dynamic Rendering**: Utilizes the **Pillow (PIL)** library to programmatically overlay participant names, event details, and unique IDs onto beautiful template images on the server-side.\n- **Bulk Email Distribution**: Integrates SMTP logic to automatically dispatch customized, rendered certificates to hundreds of participants simultaneously without triggering spam filters.\n- **Web Dashboard**: A clean HTML/CSS interface allowing organizers to upload templates, manage lists, and trigger the generation process with a single click.\n\n## Real-World Impact\n\nBuilt primarily for CSI (Computer Society of India) events at my university, this tool reduced a multi-day administrative chore into a 5-minute automated workflow.\n";
				}
				async function compiledContent$9() {
					return await html$9();
				}
				function getHeadings$9() {
					return [{"depth":2,"slug":"the-problem","text":"The Problem"},{"depth":2,"slug":"the-solution","text":"The Solution"},{"depth":3,"slug":"technical-implementation","text":"Technical Implementation"},{"depth":2,"slug":"real-world-impact","text":"Real-World Impact"}];
				}

				const Content$9 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$9;
					content.file = file$9;
					content.url = url$9;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$9())}`;
				});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$9,
	compiledContent: compiledContent$9,
	default: Content$9,
	file: file$9,
	frontmatter: frontmatter$9,
	getHeadings: getHeadings$9,
	rawContent: rawContent$9,
	url: url$9
}, Symbol.toStringTag, { value: 'Module' }));

const html$8 = () => "<h2 id=\"overview\">Overview</h2>\n<p>CMRA (Chimera) is a highly unconventional, 2D esoteric programming language where the instruction pointer doesn’t just read code—it <em>breathes fire</em>. Drawing heavy inspiration from dragons, CMRA is an exercise in chaotic, non-linear program flow and reversible execution contexts.</p>\n<h2 id=\"design-philosophy\">Design Philosophy</h2>\n<p>The traditional top-to-bottom, left-to-right execution model is replaced. In CMRA:</p>\n<ul>\n<li>Code is laid out on a 2D grid.</li>\n<li>The instruction pointer has a “direction” and “momentum.”</li>\n<li>Certain opcodes can split the pointer, reflect it, or reverse the entire execution state.</li>\n</ul>\n<h2 id=\"core-features\">Core Features</h2>\n<ul>\n<li><strong>2D Execution Grid</strong>: Control flow is spatial. Instructions act as mirrors, splitters, or directional boosters.</li>\n<li><strong>Reversible Logic</strong>: Built-in mechanisms to rewind state, making it not just an esolang but an exploration of time-reversible computing concepts.</li>\n<li><strong>Custom Interpreter</strong>: Written from the ground up to handle the unique state management required by the language’s constraints.</li>\n</ul>\n<h2 id=\"why-build-this\">Why Build This?</h2>\n<p>Because standard languages are too predictable. CMRA was built as a fun, chaotic challenge to test the limits of interpreter design and compiler theory when standard rules are thrown out the window.</p>";

				const frontmatter$8 = {"title":"CMRA Language","description":"An esoteric programming language where code breathes fire and flows like flame. Explores reversible execution and direction control through a dragon-inspired syntax.","tags":["Python","TypeScript","Esoteric"],"link":"https://cmra-esolang.vercel.app","github":"https://github.com/Chimera418/cmra","order":1};
				const file$8 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/cmra.md";
				const url$8 = undefined;
				function rawContent$8() {
					return "   \n                      \n                                                                                                                                                                                    \n                                          \n                                       \n                                            \n        \n   \n\n## Overview\n\nCMRA (Chimera) is a highly unconventional, 2D esoteric programming language where the instruction pointer doesn't just read code—it *breathes fire*. Drawing heavy inspiration from dragons, CMRA is an exercise in chaotic, non-linear program flow and reversible execution contexts.\n\n## Design Philosophy\n\nThe traditional top-to-bottom, left-to-right execution model is replaced. In CMRA:\n- Code is laid out on a 2D grid.\n- The instruction pointer has a \"direction\" and \"momentum.\"\n- Certain opcodes can split the pointer, reflect it, or reverse the entire execution state.\n\n## Core Features\n\n- **2D Execution Grid**: Control flow is spatial. Instructions act as mirrors, splitters, or directional boosters.\n- **Reversible Logic**: Built-in mechanisms to rewind state, making it not just an esolang but an exploration of time-reversible computing concepts.\n- **Custom Interpreter**: Written from the ground up to handle the unique state management required by the language's constraints.\n\n## Why Build This?\n\nBecause standard languages are too predictable. CMRA was built as a fun, chaotic challenge to test the limits of interpreter design and compiler theory when standard rules are thrown out the window.\n";
				}
				async function compiledContent$8() {
					return await html$8();
				}
				function getHeadings$8() {
					return [{"depth":2,"slug":"overview","text":"Overview"},{"depth":2,"slug":"design-philosophy","text":"Design Philosophy"},{"depth":2,"slug":"core-features","text":"Core Features"},{"depth":2,"slug":"why-build-this","text":"Why Build This?"}];
				}

				const Content$8 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$8;
					content.file = file$8;
					content.url = url$8;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$8())}`;
				});

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$8,
	compiledContent: compiledContent$8,
	default: Content$8,
	file: file$8,
	frontmatter: frontmatter$8,
	getHeadings: getHeadings$8,
	rawContent: rawContent$8,
	url: url$8
}, Symbol.toStringTag, { value: 'Module' }));

const html$7 = () => "<h2 id=\"overview\">Overview</h2>\n<p>Prescribing multiple medications simultaneously carries significant risks due to adverse drug-drug interactions (DDIs). Standard conflict detection systems often flag hundreds of minor warnings, leading to “alert fatigue” where doctors might accidentally ignore critical, life-threatening conflicts.</p>\n<h2 id=\"intelligent-detection\">Intelligent Detection</h2>\n<p>This project approaches the problem using <strong>Multi-Agent AI</strong> and <strong>Severity-Prioritized Search Algorithms</strong>:</p>\n<ul>\n<li><strong>Context-Aware Agents</strong>: Instead of simple database lookups, the agents analyze patient profiles alongside the prescription list to contextually evaluate the risk of drug interactions.</li>\n<li><strong>Severity Prioritization</strong>: The search algorithm is tuned to surface high-severity, contraindicating interactions first, suppressing low-priority noise so that healthcare providers can focus on what actually matters.</li>\n<li><strong>Prototype UI</strong>: Deployed via Streamlit, allowing users to input a mock list of prescriptions and receive an instant, tiered breakdown of potential conflicts.</li>\n</ul>\n<h2 id=\"technical-stack\">Technical Stack</h2>\n<ul>\n<li><strong>Python</strong>: Core logic and data processing.</li>\n<li><strong>AI/LLMs</strong>: Intelligent agents utilized for nuanced understanding of drug interaction literature.</li>\n<li><strong>Streamlit</strong>: Fast, responsive web interface for prototyping.</li>\n</ul>";

				const frontmatter$7 = {"title":"Drug Conflict Detection","description":"A Multi-Agent AI prototype for intelligent prescription conflict detection. Utilizes severity-prioritized search algorithms to analyze drug interactions.","tags":["Python","AI","Agents"],"link":"https://drug-conflict-detection.streamlit.app","github":"https://github.com/Chimera418/drug-conflict-detection","order":3};
				const file$7 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/drug-conflict-detection.md";
				const url$7 = undefined;
				function rawContent$7() {
					return "   \n                                \n                                                                                                                                                                        \n                                \n                                                     \n                                                               \n        \n   \n\n## Overview\n\nPrescribing multiple medications simultaneously carries significant risks due to adverse drug-drug interactions (DDIs). Standard conflict detection systems often flag hundreds of minor warnings, leading to \"alert fatigue\" where doctors might accidentally ignore critical, life-threatening conflicts.\n\n## Intelligent Detection\n\nThis project approaches the problem using **Multi-Agent AI** and **Severity-Prioritized Search Algorithms**:\n\n- **Context-Aware Agents**: Instead of simple database lookups, the agents analyze patient profiles alongside the prescription list to contextually evaluate the risk of drug interactions.\n- **Severity Prioritization**: The search algorithm is tuned to surface high-severity, contraindicating interactions first, suppressing low-priority noise so that healthcare providers can focus on what actually matters.\n- **Prototype UI**: Deployed via Streamlit, allowing users to input a mock list of prescriptions and receive an instant, tiered breakdown of potential conflicts.\n\n## Technical Stack\n\n- **Python**: Core logic and data processing.\n- **AI/LLMs**: Intelligent agents utilized for nuanced understanding of drug interaction literature.\n- **Streamlit**: Fast, responsive web interface for prototyping.\n";
				}
				async function compiledContent$7() {
					return await html$7();
				}
				function getHeadings$7() {
					return [{"depth":2,"slug":"overview","text":"Overview"},{"depth":2,"slug":"intelligent-detection","text":"Intelligent Detection"},{"depth":2,"slug":"technical-stack","text":"Technical Stack"}];
				}

				const Content$7 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$7;
					content.file = file$7;
					content.url = url$7;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$7())}`;
				});

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$7,
	compiledContent: compiledContent$7,
	default: Content$7,
	file: file$7,
	frontmatter: frontmatter$7,
	getHeadings: getHeadings$7,
	rawContent: rawContent$7,
	url: url$7
}, Symbol.toStringTag, { value: 'Module' }));

const html$6 = () => "<h2 id=\"the-ultimate-automation\">The Ultimate Automation</h2>\n<p>At my university, filling out end-of-semester feedback forms for dozens of courses and labs is a notoriously tedious, multi-step process. I built the Feedback Automater to solve this pain point entirely.</p>\n<h2 id=\"how-it-works\">How It Works</h2>\n<p>This tool is a masterclass in web scraping, browser automation, and bypassing friction:</p>\n<ol>\n<li><strong>Playwright Core</strong>: Uses Python Playwright to spin up a headless browser, navigate to the portal, and interact with the complex DOM of the feedback forms.</li>\n<li><strong>OTP Bypassing</strong>: The university portal requires an Outlook OTP to login. I integrated IMAP/Outlook scraping logic to automatically intercept the OTP email, parse the code, and inject it into the login field. The user never has to check their inbox.</li>\n<li><strong>Streamlit UI</strong>: Provides a dead-simple, accessible UI where users just put in their credentials, and the script handles the rest.</li>\n</ol>\n<h2 id=\"impact\">Impact</h2>\n<p>What used to take 20 minutes of mind-numbing clicking and typing now takes 15 seconds. It’s a perfect example of identifying a real-world friction point and engineering a robust, end-to-end automation pipeline to destroy it.</p>";

				const frontmatter$6 = {"title":"Feedback Automater","description":"End-to-end Playwright automation tool with a Streamlit UI to handle tedious university portal feedback forms, including automated Outlook OTP verification.","tags":["Python","Playwright","Streamlit"],"github":"https://github.com/Chimera418/aseb-feedback-automator","order":9};
				const file$6 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/feedback-automater.md";
				const url$6 = undefined;
				function rawContent$6() {
					return "   \n                           \n                                                                                                                                                                          \n                                           \n                                                               \n        \n   \n\n## The Ultimate Automation\n\nAt my university, filling out end-of-semester feedback forms for dozens of courses and labs is a notoriously tedious, multi-step process. I built the Feedback Automater to solve this pain point entirely.\n\n## How It Works\n\nThis tool is a masterclass in web scraping, browser automation, and bypassing friction:\n\n1.  **Playwright Core**: Uses Python Playwright to spin up a headless browser, navigate to the portal, and interact with the complex DOM of the feedback forms.\n2.  **OTP Bypassing**: The university portal requires an Outlook OTP to login. I integrated IMAP/Outlook scraping logic to automatically intercept the OTP email, parse the code, and inject it into the login field. The user never has to check their inbox.\n3.  **Streamlit UI**: Provides a dead-simple, accessible UI where users just put in their credentials, and the script handles the rest.\n\n## Impact\n\nWhat used to take 20 minutes of mind-numbing clicking and typing now takes 15 seconds. It's a perfect example of identifying a real-world friction point and engineering a robust, end-to-end automation pipeline to destroy it.\n";
				}
				async function compiledContent$6() {
					return await html$6();
				}
				function getHeadings$6() {
					return [{"depth":2,"slug":"the-ultimate-automation","text":"The Ultimate Automation"},{"depth":2,"slug":"how-it-works","text":"How It Works"},{"depth":2,"slug":"impact","text":"Impact"}];
				}

				const Content$6 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$6;
					content.file = file$6;
					content.url = url$6;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$6())}`;
				});

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$6,
	compiledContent: compiledContent$6,
	default: Content$6,
	file: file$6,
	frontmatter: frontmatter$6,
	getHeadings: getHeadings$6,
	rawContent: rawContent$6,
	url: url$6
}, Symbol.toStringTag, { value: 'Module' }));

const html$5 = () => "<h2 id=\"celebrating-gaming-excellence\">Celebrating Gaming Excellence</h2>\n<p>GOTY Games is a highly polished, responsive front-end showcase dedicated to celebrating the Game Of The Year winners across the last decade. It serves as an exploration of modern CSS layouts and visual storytelling on the web.</p>\n<h2 id=\"design-highlights\">Design Highlights</h2>\n<ul>\n<li><strong>Immersive Hero Sections</strong>: Large, striking visual banners that capture the essence of each featured game.</li>\n<li><strong>Responsive Grid Layouts</strong>: Utilizes advanced CSS Grid and Flexbox to ensure the content looks stunning on everything from a 4k monitor to a mobile device.</li>\n<li><strong>Scroll-triggered Animations</strong>: Subtle fade-ins and parallax effects that keep the user engaged as they scroll through the history of gaming.</li>\n<li><strong>Typography Focus</strong>: Clean, readable sans-serif typography that contrasts beautifully against the dark, cinematic backgrounds.</li>\n</ul>\n<h2 id=\"the-goal\">The Goal</h2>\n<p>The primary goal of this project was to master pure CSS styling without relying on utility frameworks like Tailwind or component libraries like Bootstrap. Every animation, layout quirk, and interactive state was handcrafted.</p>";

				const frontmatter$5 = {"title":"GOTY Games","description":"A front-end showcase website highlighting Game Of The Year winners with a clean, responsive layout and engaging UI.","tags":["HTML","CSS"],"link":"https://goty-games.vercel.app","github":"https://github.com/Chimera418/goty-games","order":8};
				const file$5 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/goty-games.md";
				const url$5 = undefined;
				function rawContent$5() {
					return "   \n                   \n                                                                                                                                  \n                     \n                                     \n                                                  \n        \n   \n\n## Celebrating Gaming Excellence\n\nGOTY Games is a highly polished, responsive front-end showcase dedicated to celebrating the Game Of The Year winners across the last decade. It serves as an exploration of modern CSS layouts and visual storytelling on the web.\n\n## Design Highlights\n\n- **Immersive Hero Sections**: Large, striking visual banners that capture the essence of each featured game.\n- **Responsive Grid Layouts**: Utilizes advanced CSS Grid and Flexbox to ensure the content looks stunning on everything from a 4k monitor to a mobile device.\n- **Scroll-triggered Animations**: Subtle fade-ins and parallax effects that keep the user engaged as they scroll through the history of gaming.\n- **Typography Focus**: Clean, readable sans-serif typography that contrasts beautifully against the dark, cinematic backgrounds.\n\n## The Goal\n\nThe primary goal of this project was to master pure CSS styling without relying on utility frameworks like Tailwind or component libraries like Bootstrap. Every animation, layout quirk, and interactive state was handcrafted.\n";
				}
				async function compiledContent$5() {
					return await html$5();
				}
				function getHeadings$5() {
					return [{"depth":2,"slug":"celebrating-gaming-excellence","text":"Celebrating Gaming Excellence"},{"depth":2,"slug":"design-highlights","text":"Design Highlights"},{"depth":2,"slug":"the-goal","text":"The Goal"}];
				}

				const Content$5 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$5;
					content.file = file$5;
					content.url = url$5;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$5())}`;
				});

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$5,
	compiledContent: compiledContent$5,
	default: Content$5,
	file: file$5,
	frontmatter: frontmatter$5,
	getHeadings: getHeadings$5,
	rawContent: rawContent$5,
	url: url$5
}, Symbol.toStringTag, { value: 'Module' }));

const html$4 = () => "<h2 id=\"deep-under-the-hood\">Deep Under the Hood</h2>\n<p>Most games are built in high-level engines like Unity or Godot. This one was built in <strong>Jack</strong>, a Java-like language designed specifically to be compiled down to a custom 16-bit virtual machine as part of the legendary <em>Nand2Tetris</em> course.</p>\n<h2 id=\"the-game\">The Game</h2>\n<p>The classic logic puzzle: Three monks and three cannibals must cross a river using a boat that can carry at most two people. If the cannibals ever outnumber the monks on either side of the river, the monks get eaten, and it’s game over.</p>\n<h2 id=\"technical-execution\">Technical Execution</h2>\n<p>Because Jack runs on a highly constrained simulated hardware platform, every visual and logical element had to be meticulously managed:</p>\n<ul>\n<li><strong>Direct Memory Manipulation</strong>: Sprites and graphics are drawn by directly manipulating the screen memory map.</li>\n<li><strong>Custom Event Loops</strong>: No standard libraries here—keyboard polling, game state updates, and rendering cycles were all written from scratch.</li>\n<li><strong>Memory Efficiency</strong>: The 16-bit hardware environment enforces strict memory constraints, requiring highly optimized object-oriented design and garbage collection workarounds.</li>\n</ul>\n<h2 id=\"why-jack\">Why Jack?</h2>\n<p>Building this game was the ultimate test of understanding the entire computing stack—from boolean logic gates and CPU architecture, all the way up to high-level game design.</p>";

				const frontmatter$4 = {"title":"Monks vs Cannibals","description":"Classic river crossing puzzle game implemented from scratch in the Jack programming language for the Nand2Tetris 16-bit virtual machine platform.","tags":["Jack","Nand2Tetris","VM Architecture"],"github":"https://github.com/Chimera418/Monks-and-Cannibals","order":10};
				const file$4 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/monks-vs-cannibals.md";
				const url$4 = undefined;
				function rawContent$4() {
					return "   \n                           \n                                                                                                                                                                \n                                                \n                                                           \n         \n   \n\n## Deep Under the Hood\n\nMost games are built in high-level engines like Unity or Godot. This one was built in **Jack**, a Java-like language designed specifically to be compiled down to a custom 16-bit virtual machine as part of the legendary *Nand2Tetris* course.\n\n## The Game\n\nThe classic logic puzzle: Three monks and three cannibals must cross a river using a boat that can carry at most two people. If the cannibals ever outnumber the monks on either side of the river, the monks get eaten, and it's game over.\n\n## Technical Execution\n\nBecause Jack runs on a highly constrained simulated hardware platform, every visual and logical element had to be meticulously managed:\n- **Direct Memory Manipulation**: Sprites and graphics are drawn by directly manipulating the screen memory map.\n- **Custom Event Loops**: No standard libraries here—keyboard polling, game state updates, and rendering cycles were all written from scratch.\n- **Memory Efficiency**: The 16-bit hardware environment enforces strict memory constraints, requiring highly optimized object-oriented design and garbage collection workarounds.\n\n## Why Jack?\n\nBuilding this game was the ultimate test of understanding the entire computing stack—from boolean logic gates and CPU architecture, all the way up to high-level game design.\n";
				}
				async function compiledContent$4() {
					return await html$4();
				}
				function getHeadings$4() {
					return [{"depth":2,"slug":"deep-under-the-hood","text":"Deep Under the Hood"},{"depth":2,"slug":"the-game","text":"The Game"},{"depth":2,"slug":"technical-execution","text":"Technical Execution"},{"depth":2,"slug":"why-jack","text":"Why Jack?"}];
				}

				const Content$4 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$4;
					content.file = file$4;
					content.url = url$4;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$4())}`;
				});

const __vite_glob_0_5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$4,
	compiledContent: compiledContent$4,
	default: Content$4,
	file: file$4,
	frontmatter: frontmatter$4,
	getHeadings: getHeadings$4,
	rawContent: rawContent$4,
	url: url$4
}, Symbol.toStringTag, { value: 'Module' }));

const html$3 = () => "<h2 id=\"the-challenge\">The Challenge</h2>\n<p>Proteins are the workhorses of biology, and their function is fundamentally tied to their 3D structure. Determining this structure experimentally is slow and expensive. While AlphaFold solved the 3D folding problem, there’s still a massive need for lightweight, ultra-fast secondary structure prediction (SSP) that can run on standard hardware.</p>\n<h2 id=\"the-solution\">The Solution</h2>\n<p>This project implements a hybrid deep learning architecture that accurately predicts secondary structures (Alpha-helix, Beta-sheet, Coil) directly from raw amino acid sequences.</p>\n<h3 id=\"architecture\">Architecture</h3>\n<ol>\n<li><strong>Language Model Embeddings</strong>: Uses the massive <strong>ProtT5-XL-UniRef50</strong> model (from the Rost Lab) to extract rich, context-aware embeddings for every amino acid in a sequence. It treats protein sequences like natural language.</li>\n<li><strong>Local Feature Extraction</strong>: A <strong>1D Convolutional Neural Network (CNN)</strong> sweeps across the sequence to capture local neighborhood interactions between adjacent amino acids.</li>\n<li><strong>Global Context</strong>: A <strong>Bidirectional LSTM (BiLSTM)</strong> processes the sequence in both directions to understand long-range dependencies across the entire protein chain.</li>\n<li><strong>Classification</strong>: A final dense layer maps these combined features into Q3 (3-state) or Q8 (8-state) structural predictions.</li>\n</ol>\n<h2 id=\"impact--usability\">Impact &#x26; Usability</h2>\n<p>The entire pipeline is wrapped in a user-friendly <strong>Streamlit</strong> interface and hosted on <strong>Hugging Face Spaces</strong>. Researchers can simply paste a FASTA sequence and instantly get high-accuracy secondary structure predictions without needing a GPU cluster.</p>";

				const frontmatter$3 = {"title":"Protein SSP","description":"End-to-end deep learning pipeline predicting protein secondary structures from raw amino acid sequences using ProtT5-XL-UniRef50 and a custom 1D-CNN+BiLSTM architecture.","tags":["PyTorch","Hugging Face","Streamlit","Python"],"link":"https://huggingface.co/spaces/Chimera418/protein-ssp","github":"https://github.com/Chimera418/protein-ssp","order":2};
				const file$3 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/protein-ssp.md";
				const url$3 = undefined;
				function rawContent$3() {
					return "   \n                    \n                                                                                                                                                                                        \n                                                        \n                                                            \n                                                   \n        \n   \n\n## The Challenge\n\nProteins are the workhorses of biology, and their function is fundamentally tied to their 3D structure. Determining this structure experimentally is slow and expensive. While AlphaFold solved the 3D folding problem, there's still a massive need for lightweight, ultra-fast secondary structure prediction (SSP) that can run on standard hardware.\n\n## The Solution\n\nThis project implements a hybrid deep learning architecture that accurately predicts secondary structures (Alpha-helix, Beta-sheet, Coil) directly from raw amino acid sequences. \n\n### Architecture\n\n1.  **Language Model Embeddings**: Uses the massive **ProtT5-XL-UniRef50** model (from the Rost Lab) to extract rich, context-aware embeddings for every amino acid in a sequence. It treats protein sequences like natural language.\n2.  **Local Feature Extraction**: A **1D Convolutional Neural Network (CNN)** sweeps across the sequence to capture local neighborhood interactions between adjacent amino acids.\n3.  **Global Context**: A **Bidirectional LSTM (BiLSTM)** processes the sequence in both directions to understand long-range dependencies across the entire protein chain.\n4.  **Classification**: A final dense layer maps these combined features into Q3 (3-state) or Q8 (8-state) structural predictions.\n\n## Impact & Usability\n\nThe entire pipeline is wrapped in a user-friendly **Streamlit** interface and hosted on **Hugging Face Spaces**. Researchers can simply paste a FASTA sequence and instantly get high-accuracy secondary structure predictions without needing a GPU cluster.\n";
				}
				async function compiledContent$3() {
					return await html$3();
				}
				function getHeadings$3() {
					return [{"depth":2,"slug":"the-challenge","text":"The Challenge"},{"depth":2,"slug":"the-solution","text":"The Solution"},{"depth":3,"slug":"architecture","text":"Architecture"},{"depth":2,"slug":"impact--usability","text":"Impact & Usability"}];
				}

				const Content$3 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$3;
					content.file = file$3;
					content.url = url$3;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$3())}`;
				});

const __vite_glob_0_6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$3,
	compiledContent: compiledContent$3,
	default: Content$3,
	file: file$3,
	frontmatter: frontmatter$3,
	getHeadings: getHeadings$3,
	rawContent: rawContent$3,
	url: url$3
}, Symbol.toStringTag, { value: 'Module' }));

const html$2 = () => "<h2 id=\"spam-meets-wizardry\">Spam meets Wizardry</h2>\n<p>Spamizard is a full-stack machine learning application designed to classify emails as Spam or Ham (Not Spam) and automatically generate intelligent replies.</p>\n<h2 id=\"the-model\">The Model</h2>\n<ul>\n<li><strong>Algorithm</strong>: Utilizes a Multinomial Naive Bayes classifier, which is highly effective for text classification tasks based on word frequencies.</li>\n<li><strong>Feature Extraction</strong>: Uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization to map textual email data into numerical features, heavily weighting unique words while discounting common stop-words.</li>\n<li><strong>Training</strong>: Trained on a robust dataset of over 5,000 labeled emails, achieving over 96% accuracy on unseen validation data.</li>\n</ul>\n<h2 id=\"the-web-interface\">The Web Interface</h2>\n<p>The model is deployed via a <strong>Flask</strong> backend with a responsive, modern web interface. Users can paste in raw email content, and the server runs real-time inference to determine if the email is a threat or a genuine message. If it’s genuine, the system provides an AI-assisted quick reply template.</p>";

				const frontmatter$2 = {"title":"Spamizard","description":"Smart email classifier and AI-powered reply assistant built with Scikit-learn's Naive Bayes & TF-IDF, wrapped in a clean Flask web interface.","tags":["Scikit-Learn","Flask","Python"],"link":"https://spamizard.onrender.com","github":"https://github.com/Chimera418/Spamizard","order":6};
				const file$2 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/spamizard.md";
				const url$2 = undefined;
				function rawContent$2() {
					return "   \n                  \n                                                                                                                                                            \n                                         \n                                      \n                                                 \n        \n   \n\n## Spam meets Wizardry\n\nSpamizard is a full-stack machine learning application designed to classify emails as Spam or Ham (Not Spam) and automatically generate intelligent replies.\n\n## The Model\n\n- **Algorithm**: Utilizes a Multinomial Naive Bayes classifier, which is highly effective for text classification tasks based on word frequencies.\n- **Feature Extraction**: Uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization to map textual email data into numerical features, heavily weighting unique words while discounting common stop-words.\n- **Training**: Trained on a robust dataset of over 5,000 labeled emails, achieving over 96% accuracy on unseen validation data.\n\n## The Web Interface\n\nThe model is deployed via a **Flask** backend with a responsive, modern web interface. Users can paste in raw email content, and the server runs real-time inference to determine if the email is a threat or a genuine message. If it's genuine, the system provides an AI-assisted quick reply template.\n";
				}
				async function compiledContent$2() {
					return await html$2();
				}
				function getHeadings$2() {
					return [{"depth":2,"slug":"spam-meets-wizardry","text":"Spam meets Wizardry"},{"depth":2,"slug":"the-model","text":"The Model"},{"depth":2,"slug":"the-web-interface","text":"The Web Interface"}];
				}

				const Content$2 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$2())}`;
				});

const __vite_glob_0_7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$2,
	compiledContent: compiledContent$2,
	default: Content$2,
	file: file$2,
	frontmatter: frontmatter$2,
	getHeadings: getHeadings$2,
	rawContent: rawContent$2,
	url: url$2
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = () => "<h2 id=\"a-modern-take-on-pos\">A Modern Take on POS</h2>\n<p>Tabrix is a purely frontend-focused, visually stunning restaurant Point of Sale (POS) and billing system. I wanted to build a UI that looked nothing like the boring, outdated software usually seen in retail and dining establishments.</p>\n<h2 id=\"features--uiux\">Features &#x26; UI/UX</h2>\n<ul>\n<li><strong>Glassmorphism &#x26; Dark Mode</strong>: Implements a sleek, modern dark mode aesthetic utilizing translucent panels and deep gradients.</li>\n<li><strong>Real-Time Dashboards</strong>: Interactive charts and layout features that simulate real-time analytics for restaurant management, including daily revenue, active tables, and top-selling items.</li>\n<li><strong>Fluid Animations</strong>: High-quality micro-interactions and transitions make the app feel incredibly snappy and responsive.</li>\n<li><strong>State Management</strong>: Uses robust vanilla JavaScript patterns to handle cart state, table management, and bill calculation entirely on the client-side without relying on heavy frameworks.</li>\n</ul>\n<h2 id=\"technical-achievement\">Technical Achievement</h2>\n<p>Tabrix proves that you don’t always need React or Vue to build complex, state-heavy web applications. By mastering DOM manipulation, CSS Grid, and custom event dispatchers, Tabrix delivers a premium software experience using just core web technologies.</p>";

				const frontmatter$1 = {"title":"Tabrix","description":"Modern, comprehensive web-based restaurant billing and management system. Focuses on premium UX with advanced animations and real-time dashboard stats.","tags":["JavaScript","HTML","CSS"],"link":"https://tabrix.vercel.app","github":"https://github.com/Chimera418/Tabrix","order":7};
				const file$1 = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/tabrix.md";
				const url$1 = undefined;
				function rawContent$1() {
					return "   \n               \n                                                                                                                                                                      \n                                   \n                                 \n                                              \n        \n   \n\n## A Modern Take on POS\n\nTabrix is a purely frontend-focused, visually stunning restaurant Point of Sale (POS) and billing system. I wanted to build a UI that looked nothing like the boring, outdated software usually seen in retail and dining establishments.\n\n## Features & UI/UX\n\n- **Glassmorphism & Dark Mode**: Implements a sleek, modern dark mode aesthetic utilizing translucent panels and deep gradients.\n- **Real-Time Dashboards**: Interactive charts and layout features that simulate real-time analytics for restaurant management, including daily revenue, active tables, and top-selling items.\n- **Fluid Animations**: High-quality micro-interactions and transitions make the app feel incredibly snappy and responsive.\n- **State Management**: Uses robust vanilla JavaScript patterns to handle cart state, table management, and bill calculation entirely on the client-side without relying on heavy frameworks.\n\n## Technical Achievement\n\nTabrix proves that you don't always need React or Vue to build complex, state-heavy web applications. By mastering DOM manipulation, CSS Grid, and custom event dispatchers, Tabrix delivers a premium software experience using just core web technologies.\n";
				}
				async function compiledContent$1() {
					return await html$1();
				}
				function getHeadings$1() {
					return [{"depth":2,"slug":"a-modern-take-on-pos","text":"A Modern Take on POS"},{"depth":2,"slug":"features--uiux","text":"Features & UI/UX"},{"depth":2,"slug":"technical-achievement","text":"Technical Achievement"}];
				}

				const Content$1 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html$1())}`;
				});

const __vite_glob_0_8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$1,
	compiledContent: compiledContent$1,
	default: Content$1,
	file: file$1,
	frontmatter: frontmatter$1,
	getHeadings: getHeadings$1,
	rawContent: rawContent$1,
	url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const html = () => "<h2 id=\"re-inventing-the-wheel\">Re-inventing the Wheel</h2>\n<p>Everyone uses Git, but how many truly understand how it works under the hood? I decided to find out by building a distributed version control system from scratch in Python.</p>\n<h2 id=\"core-architecture\">Core Architecture</h2>\n<p>This isn’t a wrapper around Git—it’s a fundamental implementation of version control algorithms:</p>\n<ul>\n<li><strong>Directed Acyclic Graph (DAG)</strong>: The commit history is structured as a robust DAG, allowing for complex branching and merging scenarios.</li>\n<li><strong>Merkle Trees</strong>: Implemented cryptographic Merkle Trees to track file changes and ensure the integrity of the file system at any given commit. If a single byte is tampered with, the hash mismatch immediately exposes it.</li>\n<li><strong>Object Storage</strong>: Designed an efficient blob-based object storage system to deduplicate file data across multiple commits, minimizing disk footprint.</li>\n</ul>\n<h2 id=\"key-features\">Key Features</h2>\n<ul>\n<li><code>init</code>, <code>add</code>, <code>commit</code> workflows mimicking standard VCS behavior.</li>\n<li>Branch creation and traversal.</li>\n<li>Hashing-based integrity checks for corruption detection.</li>\n</ul>\n<h2 id=\"why-i-built-it\">Why I Built It</h2>\n<p>This project was a deep dive into <strong>Applied Cryptography</strong> and <strong>Advanced Data Structures</strong>. It drastically improved my understanding of how modern file systems and version control tools ensure data integrity at scale.</p>";

				const frontmatter = {"title":"Version Control System","description":"A Git-like version control system built from scratch. Implements DAG-based commit history, Merkle Tree integrity, and branch management.","tags":["Python","Data Structures","Cryptography"],"github":"https://github.com/Chimera418/Version-Control-System","order":4};
				const file = "C:/Users/anees/Desktop/Projects/Portfolio/src/content/projects/version-control-system.md";
				const url = undefined;
				function rawContent() {
					return "   \n                               \n                                                                                                                                                       \n                                                   \n                                                              \n        \n   \n\n## Re-inventing the Wheel\n\nEveryone uses Git, but how many truly understand how it works under the hood? I decided to find out by building a distributed version control system from scratch in Python.\n\n## Core Architecture\n\nThis isn't a wrapper around Git—it's a fundamental implementation of version control algorithms:\n\n- **Directed Acyclic Graph (DAG)**: The commit history is structured as a robust DAG, allowing for complex branching and merging scenarios.\n- **Merkle Trees**: Implemented cryptographic Merkle Trees to track file changes and ensure the integrity of the file system at any given commit. If a single byte is tampered with, the hash mismatch immediately exposes it.\n- **Object Storage**: Designed an efficient blob-based object storage system to deduplicate file data across multiple commits, minimizing disk footprint.\n\n## Key Features\n\n- `init`, `add`, `commit` workflows mimicking standard VCS behavior.\n- Branch creation and traversal.\n- Hashing-based integrity checks for corruption detection.\n\n## Why I Built It\n\nThis project was a deep dive into **Applied Cryptography** and **Advanced Data Structures**. It drastically improved my understanding of how modern file systems and version control tools ensure data integrity at scale.\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":2,"slug":"re-inventing-the-wheel","text":"Re-inventing the Wheel"},{"depth":2,"slug":"core-architecture","text":"Core Architecture"},{"depth":2,"slug":"key-features","text":"Key Features"},{"depth":2,"slug":"why-i-built-it","text":"Why I Built It"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const __vite_glob_0_9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_0 as _, __vite_glob_0_1 as a, __vite_glob_0_2 as b, __vite_glob_0_3 as c, __vite_glob_0_4 as d, __vite_glob_0_5 as e, __vite_glob_0_6 as f, __vite_glob_0_7 as g, __vite_glob_0_8 as h, __vite_glob_0_9 as i };
