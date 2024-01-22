const { test, expect } = require('@playwright/test');

const websiteURL = 'https://razoredge.vercel.app/'
const websiteTitle = 'Razor Edge'

test('Check the title of Next.js website', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto(websiteURL);

  // // Get the title of the page
  const pageTitle = await page.title();

  // Assert that the title is as expected
  expect(pageTitle).toBe(websiteTitle);
});


test('Check if the hero section loads properly on the Next.js website', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the hero section to be visible. Replace 'your-hero-section-selector' with the actual CSS selector for your hero section.
  await page.waitForSelector('#home');

  // Check if the hero section is visible
  const heroSection = await page.$eval('#home', (div) => div.id);
  expect(heroSection).toBeTruthy();
});

test('Check if the services section loads properly on the Next.js website', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/');
  
  // Wait for the services section to be visible. Replace 'your-services-section-selector' with the actual CSS selector for your services section.
  await page.waitForSelector('#service', { visible: true });

  // Check if the services section is visible
  const servicesSection = await page.$eval('#service', (div) => div.id);;
  expect(servicesSection).toBeTruthy();
});

test('Check if the products section loads properly on the Next.js website', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the products section to be visible. Replace 'your-products-section-selector' with the actual CSS selector for your products section.
  await page.waitForSelector('#carouselBody', { visible: true });

  // Check if the products section is visible
  const productsSection = await page.$eval('#carouselBody', (div) => div.id);
  expect(productsSection).toBeTruthy();
});

test('Check if the testimonials section loads properly on the Next.js website', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the testimonials section to be visible. Replace 'your-testimonials-section-selector' with the actual CSS selector for your testimonials section.
  await page.waitForSelector('#testimonial', { visible: true });

  // Check if the testimonials section is visible
  const testimonialsSection = await page.$eval('#testimonial', (div) => div.id);
  expect(testimonialsSection).toBeTruthy();
});

test('Check if the hero section has a paragraph with specific text on the Next.js website', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the hero section to be visible. Replace 'your-hero-section-selector' with the actual CSS selector for your hero section.
  await page.waitForSelector('#home', { visible: true });
  const heroTitleTextContent = await page.$eval('#home p', (p) => p.textContent);

  // Check if the content matches the expected value
  expect(heroTitleTextContent).toBe('Where style meets Precision');
});

test('Check presence of social media links in the footer', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the contact-us div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#contact-us', { timeout: 5000 });

  // Check the presence of social media links
  const twitterLink = await page.$eval('#contact-us #footerSMIconTwitter', (twitterIcon) => {
    const link = twitterIcon.parentElement.href;
    return link && link.includes('twitter.com');
  });

  const facebookLink = await page.$eval('#contact-us #footerSMIconFacebbok', (facebookIcon) => {
    const link = facebookIcon.parentElement.href;
    return link && link.includes('facebook.com');
  });

  const instagramLink = await page.$eval('#contact-us #footerSMIconInstagram', (instagramIcon) => {
    const link = instagramIcon.parentElement.href;
    return link && link.includes('instagram.com');
  });

  const whatsappLink = await page.$eval('#contact-us #footerSMIconWhatsApp', (whatsappIcon) => {
    const link = whatsappIcon.parentElement.href;
    return link && link.includes('wa.me/1234567890');
  });

  // Check if all social media links are present
  expect(twitterLink).toBeTruthy();
  expect(facebookLink).toBeTruthy();
  expect(instagramLink).toBeTruthy();
  expect(whatsappLink).toBeTruthy();
});


test('Check presence of images in carouselContainer', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the carouselContainer div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#carouselContainer', { timeout: 5000 });

  // Check the presence of images
  const imageIds = [
    'sephora-img', 'athr-img', 'augustis-img', 'aN-img', 'albrey-img',
    'aveda-img', 'sephora-img-dup', 'athr-img-dup', 'augustis-img-dup', 'aN-img-dup', 'albrey-img-dup'
  ];

  for (const imageId of imageIds) {
    const imageSelector = `#${imageId}`;
    const image = await page.$(imageSelector);

    // Check if the image with the given ID is present
    expect(image).toBeTruthy();
  }
});

test('Check if the site is visible and has copyright text', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the contact-us div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#contact-us', { timeout: 5000 });

  // Get the text content of the p tag inside the contact-us div
  const pTagText = await page.$eval('#contact-us #RECopywriteText', (p) => p.textContent.trim());

  // Check if the text content matches the expected value
  const expectedText = '© 2023 RAZOR EDGE Inc'; // Replace with the expected text
  expect(pTagText).toBe(expectedText);
});

// test('Check if the hero section CTA button has the text "View Offers" on the Next.js website', async ({ page }) => {
//   // Navigate to your Next.js website
//   await page.goto('https://razoredge.vercel.app/');

//   // Wait for the hero section to be visible. Replace 'your-hero-section-selector' with the actual CSS selector for your hero section.
//   await page.waitForSelector('#home', { visible: true });

//   // Check if the hero section is visible
//   const heroSection = await page.$('#home');
//   expect(heroSection).toBeTruthy();

//   // Check the text of the CTA button within the hero section
//   const ctaButtonText = await heroSection.$eval('#home #offerButton', button => button.innerText);
  
//   // Ensure that the CTA button text is "View Offers"
//   expect(ctaButtonText).toBe('View Offers');
// });


test('Check CTA text content of the button with text "View Offers"', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the home div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#home', { timeout: 5000 });

  // Get the text content of the button with id "offerButton"
  const buttonText = await page.$eval('#home #offerButton', (button) => button.textContent.trim());

  // Check if the text content matches the expected value
  const expectedText = 'View Offers';
  expect(buttonText).toBe(expectedText);
});

test('Develop PW Test for Offers Subscription Space in Footer"', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the contact-us div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#contact-us', { timeout: 5000 });

  // Get the text content of the p tag with id "footerHeading"
  const footerHeadingText = await page.$eval('#contact-us #footerHeading', (p) => p.textContent.trim());

  // Check if the text content matches the expected value
  const expectedText = 'subscribe now for irresistible offers!'; // Replace with the expected text
  expect(footerHeadingText).toBe(expectedText);
});

test('Check presence of p tags inside About Page', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/about');

  // Wait for the AboutPageContainer div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#leftSectionContainer', { visible: true });

  // Check the presence of p tags inside the div
  const pTags = await page.$$('#leftSectionContainer p');

  // Check if at least one p tag is present
  expect(pTags.length).toBeGreaterThan(0);
});

// test('Check if the hero section has a Call-to-Action (CTA) button', async ({ page }) => {
//   // Navigate to your Next.js website
//   await page.goto('https://razoredge.vercel.app/');

//   // Wait for the hero section to be visible. Replace 'your-hero-section-selector' with the actual CSS selector for your hero section.
//   await page.waitForSelector('your-hero-section-selector', { visible: true });

//   // Check if the hero section is visible
//   const heroSection = await page.$('your-hero-section-selector');
//   expect(heroSection).toBeTruthy();

//   // Check if there is a Call-to-Action (CTA) button within the hero section. Replace 'your-cta-button-selector' with the actual CSS selector for your CTA button.
//   const ctaButton = await heroSection.$('your-cta-button-selector');
//   expect(ctaButton).toBeTruthy();
// });


test('Check presence of Button element inside div', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('.flex-column', { timeout: 5000 });

  // Check the presence of the Button element inside the div
  const button = await page.$('#heroTitleText + #heroSubTitleText + #offerButton');

  // Check if the Button element is present
  expect(button).toBeTruthy();
});

test('Check count of testimonialAuthorName p tags', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the testimonial div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#testimonial', { timeout: 5000 });

  // Count the occurrences of p tags with id "testimonialAuthorName"
  const count = await page.$$eval('#testimonial #testimonialAuthorName', (elements) => elements.length);

  // Check if the count matches the expected value
  const expectedCount = 3; // Replace with the expected count
  expect(count).toBe(expectedCount);
});

test('Check if dialog opens when offerButton is pressed', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the offerButton to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#offerButton', { timeout: 5000 });

  // Click the offerButton to trigger the dialog
  await page.click('#offerButton');

  // Wait for the dialog with id "bannerContainer" to be visible
  await page.waitForSelector('#bannerContainer', { visible: true, timeout: 5000 });

  // Check if the dialog is visible
  const isDialogVisible = await page.isVisible('#bannerContainer');
  expect(isDialogVisible).toBeTruthy();
});

test('Check presence of video element', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the video element to be present (adjust the selector and wait time as needed)
  const videoElement = await page.waitForSelector('#backgroundVideo', { timeout: 5000 });

  // Check if the video element is present
  expect(videoElement).toBeTruthy();
});

test('Navbar Menu Items Count', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the Menubar to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#navbar', { timeout: 5000 });

  // Count the occurrences of li elements with specific ids
  const homeCount = await page.$$eval('#navbar li[id="home"]', (elements) => elements.length);
  const aboutCount = await page.$$eval('#navbar li[id="about"]', (elements) => elements.length);
  const servicesCount = await page.$$eval('#navbar li[id="services"]', (elements) => elements.length);
  const contactUsCount = await page.$$eval('#navbar li[id="contactus"]', (elements) => elements.length);

  // Check if the counts match the expected values
  expect(homeCount).toBe(1);
  expect(aboutCount).toBe(1);
  expect(servicesCount).toBe(1);
  expect(contactUsCount).toBe(1);
});

test('Check presence of InputText element in the footer', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#contact-us', { timeout: 5000 });

  // Check the presence of InputText element with id "footerInputEmailAdd"
  const inputText = await page.$('#footerInputEmailAdd');

  // Check if the InputText element is present
  expect(inputText).toBeTruthy();
});

test('check "Our Story" in about us page', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/about');

  // Wait for the hero section to be visible. Replace 'your-hero-section-selector' with the actual CSS selector for your hero section.
  await page.waitForSelector('#storyImage', { visible: true });
  const heroTitleTextContent = await page.$eval('#storyImage p', (p) => p.textContent);

  // Check if the content matches the expected value
  expect(heroTitleTextContent).toBe('Our Story');
});

test('check "Our Vision" in about us page', async ({ page }) => {
  // Navigate to your Next.js website
  await page.goto('https://razoredge.vercel.app/about');

  // Wait for the hero section to be visible. Replace 'your-hero-section-selector' with the actual CSS selector for your hero section.
  await page.waitForSelector('#visionSectionContainer', { visible: true });
  const heroTitleTextContent = await page.$eval('#visionSectionContainer p', (p) => p.textContent);

  // Check if the content matches the expected value
  expect(heroTitleTextContent).toBe('Our Vision');
});

test('Check presence and visibility of Cookie Banner', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://razoredge.vercel.app/');

  // Wait for the Cookie Banner div to be rendered (adjust the selector and wait time as needed)
  await page.waitForSelector('#mainDivCookieBanner', { timeout: 5000 });

  // Check the presence of the Cookie Banner div
  const cookieBannerDiv = await page.$('#mainDivCookieBanner');

  // Check if the Cookie Banner div is present
  expect(cookieBannerDiv).toBeTruthy();

  // Check if the Cookie Banner div is visible
  const isCookieBannerVisible = await page.isVisible('#mainDivCookieBanner');
  expect(isCookieBannerVisible).toBeTruthy();
});


