//This code inspired by https://github.com/rastikerdar/vazir-font/blob/gh-pages/index.html
var donators = [];

async function Generate_X64_Download_Link() {
  const downloadLink = await getDownloadLink("x64.exe");
  $('.x64').attr('href', downloadLink);
}

async function Generate_X86_Download_Link() {
  const downloadLink = await getDownloadLink("x86.exe");
  $('.x86').attr('href', downloadLink);
}

async function Generate_X64_Portable_Download_Link() {
  const downloadLink = await getDownloadLink("x64-portable.exe");
  $('.x64-portable').attr('href', downloadLink);
}

async function Generate_X86_Portable_Download_Link() {
  const downloadLink = await getDownloadLink("x86-portable.exe");
  $('.x86-portable').attr('href', downloadLink);
}

async function Generate_X64_Without_Prerequisites_Download_Link() {
  const downloadLink = await getDownloadLink("x64-without-prerequisites.exe");
  $('.x64-without-prerequisites').attr('href', downloadLink);
}

async function Generate_X86_Without_Prerequisites_Download_Link() {
  const downloadLink = await getDownloadLink("x86-without-prerequisites.exe");
  $('.x86-without-prerequisites').attr('href', downloadLink);
}

async function Generate_Main_Download_Link() {
  let downloadLink = '';  

  downloadLink = 
    navigator.userAgent.includes('WOW64') || navigator.userAgent.includes('Win64') 
    ? await getDownloadLink("x64.exe")
    : await getDownloadLink("x86.exe");
  
  $('.section-download__main').attr('href', downloadLink);
}

async function getDownloadLink(endWith){
  const assets = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets;  
  const index = assets.findIndex(function (asset) {  return asset.name.endsWith(endWith)});
  if (index == -1)  return await "https://github.com/kokabi1365/Vajehdan/releases/latest"  
  const downloadLink = assets[index].browser_download_url;
  return await downloadLink;
}

async function loadDonators() {
  donators = await $.getJSON('scripts/donators.json');
  await setProjectLifeTimeAsync();
  await setTotalDonatorsCount();
  await setTotalDonationAmount();
  await createDonatorNodes('amount');
}

async function setProjectLifeTimeAsync() {
  const repo = await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan');
  $('.section-donation__project-life-span').html(toPersianNumber(yearsSince(repo.created_at)));
}

function setTotalDonatorsCount() {
  $('.section-donation__counter').html(toPersianNumber(donators.length));
}

function setTotalDonationAmount() {
  $('.section-donation__amount').html(toPersianNumber(formatNumber(donators.map((donator) => donator.amount).reduce((sum, amount) => sum + amount))));
}

async function createDonatorNodes(sortKey) {
  sortBy(sortKey);
  $('.section-donation__donators').empty();
  for (const donator of donators) {
    donator.photo = donator.photo ? donator.photo : `https://eu.ui-avatars.com/api/?format=svg&background=random&name=${donator.name}`;

    var li = '';

    li = `<li class="donator">`;

    if (donator.website) li += `<a href="${donator.website}" rel="nofollow" target="_blank" title="${donator.date}">`;

    li += `<img class="donator__photo" src="${donator.photo}" alt="${donator.name}" title=${donator.date} loading="lazy">
      <p class="donator__name" ${donator.website ? 'style=color:blue;' : ''}>${donator.name}</p>`;

    li += `<span class="donator__amount">${toPersianNumber(formatNumber(donator.amount))} تومان</span>`;

    if (donator.website) li += '</a>';

    li += '</li>\n';

    $(li).appendTo('.section-donation__donators').hide().fadeIn();
  }
}

function yearsSince(date) {
  var seconds = Math.round((new Date() - new Date(date)) / 1000);
  var interval = seconds / 31536000;
  return Math.round(interval);
}

function toPersianNumber(n) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
}

function sortBy(key) {
  if (key == 'date') donators.sort((a, b) => b.date.localeCompare(a.date));
  else if (key == 'amount') donators.sort((a, b) => b.amount - a.amount);
  else if (key == 'alphabet') donators.sort((a, b) => a.name.localeCompare(b.name));

  if (key == 'date') {
    $('.section-donation__date_link').css({ color: 'blue', 'font-weight': 'bold' });
    $('.section-donation__amount_link').removeAttr('style');
    $('.section-donation__alphabet_link').removeAttr('style');
  } else if (key == 'amount') {
    $('.section-donation__amount_link').css({ color: 'blue', 'font-weight': 'bold' });
    $('.section-donation__date_link').removeAttr('style');
    $('.section-donation__alphabet_link').removeAttr('style');
  } else {
    $('.section-donation__alphabet_link').css({ color: 'blue', 'font-weight': 'bold' });
    $('.section-donation__date_link').removeAttr('style');
    $('.section-donation__amount_link').removeAttr('style');
  }
}

$(async function () {
  await Generate_Main_Download_Link();
  await Generate_X64_Download_Link();
  await Generate_X86_Download_Link();
  await Generate_X86_Portable_Download_Link();
  await Generate_X64_Portable_Download_Link();
  await Generate_X86_Without_Prerequisites_Download_Link();
  await Generate_X64_Without_Prerequisites_Download_Link();
  await loadDonators();
});
