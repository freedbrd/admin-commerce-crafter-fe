import { environment } from '../../../environments/environment';

export function isSupabaseImageUrl(url: string): boolean {
  return url.startsWith(environment.supabaseUrl + '/storage/v1/object/public/');
}

export function extractSupabaseFolders(url: string) {
  const urlParts = url.split('/');
  const uuidIndex = urlParts.findIndex(part => part.match(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i));

  if (uuidIndex !== -1) {
    return urlParts.slice(uuidIndex).join('/');
  } else {
    return null; // Якщо UUID не знайдено в URL, повертаємо null або можна вирішити іншим чином
  }
}
