// Supabase配置
window.supabaseConfig = {
    url: 'https://rnugxeiwnbnfhgzewfib.supabase.co',
    key: 'sb_publishable_rJOhrgtxKqJ6SeinOwSozQ_O2RLrrD4'
};

// 初始化Supabase客户端
if (typeof window.supabaseInstance === 'undefined') {
    // 确保supabase对象未被声明
    if (typeof supabase === 'undefined') {
        // 直接初始化Supabase客户端
        const { createClient } = window.supabase;
        window.supabaseInstance = createClient(window.supabaseConfig.url, window.supabaseConfig.key);
    } else {
        console.error('Supabase对象已经存在，跳过初始化');
        window.supabaseInstance = supabase;
    }
}
