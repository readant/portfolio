// 礼物数据管理和加密功能

// 加密函数
function encryptData(data) {
    try {
        const jsonString = JSON.stringify(data);
        return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (error) {
        console.error('加密数据失败:', error);
        return null;
    }
}

// 解密函数
function decryptData(encryptedData) {
    try {
        const jsonString = decodeURIComponent(escape(atob(encryptedData)));
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('解密数据失败:', error);
        return null;
    }
}

// 存储礼物数据
function saveGifts(gifts) {
    try {
        const encryptedGifts = encryptData(gifts);
        if (encryptedGifts) {
            localStorage.setItem('encryptedGifts', encryptedGifts);
            return true;
        }
        return false;
    } catch (error) {
        console.error('存储礼物数据失败:', error);
        return false;
    }
}

// 获取礼物数据
function getGifts() {
    try {
        const encryptedGifts = localStorage.getItem('encryptedGifts');
        if (encryptedGifts) {
            const gifts = decryptData(encryptedGifts);
            return gifts || [];
        }
        return [];
    } catch (error) {
        console.error('获取礼物数据失败:', error);
        return [];
    }
}

// 添加礼物
function addGift(gift) {
    try {
        const gifts = getGifts();
        const newGift = {
            id: Date.now(),
            ...gift
        };
        gifts.push(newGift);
        return saveGifts(gifts);
    } catch (error) {
        console.error('添加礼物失败:', error);
        return false;
    }
}

// 更新礼物
function updateGift(id, updatedGift) {
    try {
        const gifts = getGifts();
        const index = gifts.findIndex(gift => gift.id === id);
        if (index !== -1) {
            gifts[index] = {
                ...gifts[index],
                ...updatedGift
            };
            return saveGifts(gifts);
        }
        return false;
    } catch (error) {
        console.error('更新礼物失败:', error);
        return false;
    }
}

// 删除礼物
function deleteGift(id) {
    try {
        const gifts = getGifts();
        const filteredGifts = gifts.filter(gift => gift.id !== id);
        return saveGifts(filteredGifts);
    } catch (error) {
        console.error('删除礼物失败:', error);
        return false;
    }
}

// 搜索礼物
function searchGifts(keyword) {
    try {
        const gifts = getGifts();
        if (!keyword) return gifts;
        
        const searchTerm = keyword.toLowerCase();
        return gifts.filter(gift => {
            return (
                gift.name.toLowerCase().includes(searchTerm) ||
                gift.gift.toLowerCase().includes(searchTerm) ||
                (gift.note && gift.note.toLowerCase().includes(searchTerm))
            );
        });
    } catch (error) {
        console.error('搜索礼物失败:', error);
        return [];
    }
}

// 导出礼物数据
function exportGifts() {
    try {
        const gifts = getGifts();
        const jsonString = JSON.stringify(gifts, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gifts-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('导出礼物数据失败:', error);
        return false;
    }
}

// 导入礼物数据
function importGifts(jsonString) {
    try {
        const gifts = JSON.parse(jsonString);
        if (Array.isArray(gifts)) {
            return saveGifts(gifts);
        }
        return false;
    } catch (error) {
        console.error('导入礼物数据失败:', error);
        return false;
    }
}

// 密码验证函数
function verifyPassword(password) {
    // 验证农历八月初八作为密码
    // 格式: 农历年份-月份-日期，例如: 2026-08-08
    const validPasswords = [
        '2026-08-08', // 2026年农历八月初八
        '08-08',      // 简化格式: 八月初八
        '0808',       // 无连字符格式: 0808
        '农历八月初八' // 中文格式
    ];
    
    return validPasswords.includes(password);
}

// 导出功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveGifts,
        getGifts,
        addGift,
        updateGift,
        deleteGift,
        searchGifts,
        exportGifts,
        importGifts,
        verifyPassword
    };
}
