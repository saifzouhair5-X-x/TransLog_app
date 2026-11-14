import { useCallback, useState } from 'react';
import { Toast } from '@/components/Toast';
import { initialDriver } from '@/data/driver';
import { initialMissions } from '@/data/missions';
import { currentTime } from '@/lib/format';
import type { Alert, Driver, Mission, ScreenId, ScreenProps } from '@/lib/types';
import { ClosingScreen } from '@/screens/ClosingScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { CustomsScreen } from '@/screens/CustomsScreen';
import { DeliveryArrivalScreen } from '@/screens/DeliveryArrivalScreen';
import { DocumentsScreen } from '@/screens/DocumentsScreen';
import { GoodsCheckScreen } from '@/screens/GoodsCheckScreen';
import { IncidentScreen } from '@/screens/IncidentScreen';
import { LoadingArrivalScreen } from '@/screens/LoadingArrivalScreen';
import { LoadingReservesScreen } from '@/screens/LoadingReservesScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { MissionDetailScreen } from '@/screens/MissionDetailScreen';
import { MissionEndScreen } from '@/screens/MissionEndScreen';
import { MissionsScreen } from '@/screens/MissionsScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RefusalScreen } from '@/screens/RefusalScreen';
import { TripScreen } from '@/screens/TripScreen';
import { UnloadingScreen } from '@/screens/UnloadingScreen';
import { VehicleCheckScreen } from '@/screens/VehicleCheckScreen';

const TAB_SCREENS: ScreenId[] = ['missions', 'dashboard', 'customs', 'profile'];

interface ToastState {
  id: number;
  text: string;
}

function App() {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [driver, setDriver] = useState<Driver>(initialDriver);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stack, setStack] = useState<ScreenId[]>(['login']);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const current = stack[stack.length - 1];
  const selected = missions.find((mission) => mission.id === selectedId) ?? null;
  const unread = alerts.filter((alert) => !alert.lu).length;

  const goTo = useCallback((screen: ScreenId) => {
    if (TAB_SCREENS.includes(screen)) {
      setStack([screen]);
      return;
    }
    setStack((prev) => {
      const index = prev.lastIndexOf(screen);
      return index >= 0 ? prev.slice(0, index + 1) : [...prev, screen];
    });
  }, []);

  const back = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const selectMission = (mission: Mission) => {
    setSelectedId(mission.id);
    goTo(mission.etape);
  };

  const patchMission = (missionId: string, patch: Partial<Mission>) => {
    setMissions((prev) => prev.map((mission) => (mission.id === missionId ? { ...mission, ...patch } : mission)));
  };

  const addAlert = (missionId: string, titre: string, texte: string) => {
    setAlerts((prev) => [
      { id: `${Date.now()}-${Math.random()}`, missionId, titre, texte, heure: currentTime(), lu: false },
      ...prev,
    ]);
  };

  const markAllAlertsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, lu: true })));
  }, []);

  const notify = (text: string) => setToast({ id: Date.now(), text });
  const dismissToast = useCallback(() => setToast(null), []);

  const renderScreen = () => {
    if (current === 'login') return <LoginScreen goTo={goTo} />;
    if (current === 'missions') {
      return (
        <MissionsScreen
          missions={missions}
          driver={driver}
          unread={unread}
          onSelect={selectMission}
          goTo={goTo}
        />
      );
    }
    if (current === 'dashboard') {
      return (
        <DashboardScreen
          missions={missions}
          driver={driver}
          unread={unread}
          goTo={goTo}
        />
      );
    }
    if (current === 'customs') {
      return (
        <CustomsScreen
          missions={missions}
          unread={unread}
          goTo={goTo}
          onUpdate={patchMission}
          onAddAlert={addAlert}
        />
      );
    }
    if (current === 'profile') {
      return <ProfileScreen driver={driver} unread={unread} goTo={goTo} onSave={setDriver} notify={notify} />;
    }
    if (current === 'notifications') {
      return <NotificationsScreen alerts={alerts} onMarkAllRead={markAllAlertsRead} back={back} />;
    }
    if (!selected) return null;

    const props: ScreenProps = {
      mission: selected,
      updateMission: (patch) => patchMission(selected.id, patch),
      goTo,
      back,
      notify,
      addAlert: (titre, texte) => addAlert(selected.id, titre, texte),
    };

    switch (current) {
      case 'mission-detail':
        return <MissionDetailScreen {...props} driver={driver} />;
      case 'refusal':
        return <RefusalScreen {...props} />;
      case 'vehicle-check':
        return <VehicleCheckScreen {...props} />;
      case 'loading-arrival':
        return <LoadingArrivalScreen {...props} />;
      case 'goods-check':
        return <GoodsCheckScreen {...props} />;
      case 'loading-reserves':
        return <LoadingReservesScreen {...props} />;
      case 'documents':
        return <DocumentsScreen {...props} />;
      case 'trip':
        return <TripScreen {...props} />;
      case 'incident':
        return <IncidentScreen {...props} />;
      case 'delivery-arrival':
        return <DeliveryArrivalScreen {...props} />;
      case 'unloading':
        return <UnloadingScreen {...props} />;
      case 'closing':
        return <ClosingScreen {...props} />;
      case 'mission-end':
        return <MissionEndScreen {...props} />;
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center sm:p-6">
      <div className="relative h-dvh w-full overflow-hidden bg-canvas sm:h-[min(852px,calc(100dvh-48px))] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl sm:ring-8 sm:ring-night">
        {renderScreen()}
        {toast && <Toast key={toast.id} message={toast.text} onDismiss={dismissToast} />}
      </div>
    </div>
  );
}

export default App;
