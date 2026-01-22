// Supabase服务层 - 封装与Supabase的交互逻辑

// 确保只在图书馆系统中使用
if (typeof window.supabaseService === 'undefined') {
    window.supabaseService = {
        // 获取Supabase客户端实例
        getClient() {
            return window.supabaseInstance;
        },

        // 图书相关操作
        books: {
            // 获取所有图书
            async getAll() {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('books')
                        .select('*');
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('获取图书失败:', error);
                    return [];
                }
            },

            // 添加图书
            async add(book) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('books')
                        .insert([book])
                        .select();
                    if (error) throw error;
                    return data[0];
                } catch (error) {
                    console.error('添加图书失败:', error);
                    return null;
                }
            },

            // 更新图书
            async update(id, bookData) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('books')
                        .update(bookData)
                        .eq('id', id)
                        .select();
                    if (error) throw error;
                    return data[0];
                } catch (error) {
                    console.error('更新图书失败:', error);
                    return null;
                }
            },

            // 删除图书
            async delete(id) {
                try {
                    const { error } = await window.supabaseInstance
                        .from('books')
                        .delete()
                        .eq('id', id);
                    if (error) throw error;
                    return true;
                } catch (error) {
                    console.error('删除图书失败:', error);
                    return false;
                }
            },

            // 搜索图书
            async search(searchTerm) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('books')
                        .select('*')
                        .ilike('title', `%${searchTerm}%`)
                        .or(`ilike(author, '%${searchTerm}%'),ilike(isbn, '%${searchTerm}%'),ilike(category, '%${searchTerm}%')`);
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('搜索图书失败:', error);
                    return [];
                }
            }
        },

        // 读者相关操作
        readers: {
            // 获取所有读者
            async getAll() {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('readers')
                        .select('*');
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('获取读者失败:', error);
                    return [];
                }
            },

            // 根据ID获取读者
            async getById(id) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('readers')
                        .select('*')
                        .eq('id', id)
                        .single();
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('获取读者失败:', error);
                    return null;
                }
            }
        },

        // 借阅记录相关操作
        borrowRecords: {
            // 获取所有借阅记录
            async getAll() {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('borrow_records')
                        .select('*');
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('获取借阅记录失败:', error);
                    return [];
                }
            },

            // 添加借阅记录
            async add(record) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('borrow_records')
                        .insert([record])
                        .select();
                    if (error) throw error;
                    return data[0];
                } catch (error) {
                    console.error('添加借阅记录失败:', error);
                    return null;
                }
            },

            // 更新借阅记录
            async update(id, recordData) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('borrow_records')
                        .update(recordData)
                        .eq('id', id)
                        .select();
                    if (error) throw error;
                    return data[0];
                } catch (error) {
                    console.error('更新借阅记录失败:', error);
                    return null;
                }
            },

            // 获取当前借阅记录
            async getCurrentBorrows() {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('borrow_records')
                        .select('*')
                        .is('return_date', null);
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('获取当前借阅记录失败:', error);
                    return [];
                }
            }
        },

        // 公告相关操作
        announcements: {
            // 获取所有公告
            async getAll() {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('announcements')
                        .select('*')
                        .order('date', { ascending: false });
                    if (error) throw error;
                    return data;
                } catch (error) {
                    console.error('获取公告失败:', error);
                    return [];
                }
            },

            // 添加公告
            async add(announcement) {
                try {
                    const { data, error } = await window.supabaseInstance
                        .from('announcements')
                        .insert([announcement])
                        .select();
                    if (error) throw error;
                    return data[0];
                } catch (error) {
                    console.error('添加公告失败:', error);
                    return null;
                }
            }
        }
    };
}
